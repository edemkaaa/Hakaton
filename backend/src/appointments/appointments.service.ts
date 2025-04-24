import { Injectable, BadRequestException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, In, MoreThan } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { Employee } from '../employees/entities/employee.entity';
import { Service } from '../services/entities/service.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentStatusDto } from './dto/updateAppointment-status.dto';
import { VerificationCode } from './entities/verification-code.entity';
import { SmsService } from '../sms/sms.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(VerificationCode)
    private verificationRepository: Repository<VerificationCode>,
    private smsService: SmsService,
  ) {}

  async getAvailableSlots(employeeId: number, date: string) {
    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
      relations: ['services', 'workSchedule'],
    });

    if (!employee) {
      throw new BadRequestException('Сотрудник не найден');
    }

    const appointments = await this.appointmentRepository.find({
      where: {
        employee: { id: employeeId },
        startTime: Between(
          new Date(`${date}T00:00:00`),
          new Date(`${date}T23:59:59`)
        ),
        status: 'confirmed'
      },
      order: {
        startTime: 'ASC'
      }
    });

    const availableSlots = this.generateTimeSlots(employee, appointments, date);
    return availableSlots;
  }

  private generateTimeSlots(employee: Employee, appointments: Appointment[], date: string): string[] {
    const slots: string[] = [];
    const schedule = employee.workSchedule.find(
      (schedule) => schedule.dayOfWeek === new Date(date).getDay(),
    );

    if (!schedule) {
      return slots; 
    }

    const startTime = new Date(`${date}T${schedule.startTime}`);
    const endTime = new Date(`${date}T${schedule.endTime}`);
    const slotDuration = 30; // интервал 30 минут

    const breakStart = schedule.breakStart ? new Date(`${date}T${schedule.breakStart}`) : null;
    const breakEnd = schedule.breakEnd ? new Date(`${date}T${schedule.breakEnd}`) : null;

    let currentSlot = new Date(startTime);

    while (currentSlot < endTime) {
      const slotEnd = new Date(currentSlot.getTime() + slotDuration * 60000);

      const isDuringBreak = breakStart && breakEnd && 
        currentSlot >= breakStart && currentSlot < breakEnd;

      const isOverlapping = appointments.some(appointment => {
        const appointmentEnd = new Date(appointment.startTime.getTime() + slotDuration * 60000);
        return currentSlot < appointmentEnd && slotEnd > appointment.startTime;
      });

      if (!isDuringBreak && !isOverlapping) {
        slots.push(currentSlot.toISOString());
      }

      currentSlot = slotEnd;
    }

    return slots;
  }

  async checkSlotAvailability(employeeId: number, time: string): Promise<{ available: boolean; reason?: string }> {
    const date = new Date(time);
    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
      relations: ['workSchedule']
    });

    if (!employee) {
      return { available: false, reason: 'Сотрудник не найден' };
    }

    const schedule = employee.workSchedule.find(
      s => s.dayOfWeek === date.getDay()
    );

    if (!schedule) {
      return { available: false, reason: 'Нерабочий день' };
    }

    const startTime = new Date(`${date.toISOString().split('T')[0]}T${schedule.startTime}`);
    const endTime = new Date(`${date.toISOString().split('T')[0]}T${schedule.endTime}`);
    
    if (date < startTime || date >= endTime) {
      return { available: false, reason: 'Вне рабочего времени' };
    }

    if (schedule.breakStart && schedule.breakEnd) {
      const breakStart = new Date(`${date.toISOString().split('T')[0]}T${schedule.breakStart}`);
      const breakEnd = new Date(`${date.toISOString().split('T')[0]}T${schedule.breakEnd}`);
      
      if (date >= breakStart && date < breakEnd) {
        return { available: false, reason: 'Время перерыва' };
      }
    }

    const slotEnd = new Date(date.getTime() + 30 * 60000);
    const existingAppointment = await this.appointmentRepository.findOne({
      where: {
        employee: { id: employeeId },
        startTime: Between(date, slotEnd),
        status: 'confirmed'
      }
    });

    return existingAppointment 
      ? { available: false, reason: 'Время уже занято' }
      : { available: true };
  }

  async create(createAppointmentDto: CreateAppointmentDto) {
    const availability = await this.checkSlotAvailability(
      createAppointmentDto.employeeId,
      createAppointmentDto.appointmentTime
    );

    if (!availability.available) {
      throw new BadRequestException(availability.reason || 'Выбранное время недоступно');
    }

    const startTime = new Date(createAppointmentDto.appointmentTime);
    const appointment = this.appointmentRepository.create({
      ...createAppointmentDto,
      startTime,
      endTime: new Date(startTime.getTime() + 30 * 60000),
      status: 'pending'
    });

    return this.appointmentRepository.save(appointment);
  }

  async findByEmployee(employeeId: number) {
    return this.appointmentRepository.find({
      where: {
        employee: { id: employeeId }
      },
      relations: ['user', 'direction', 'employee']
    });
  }

  async updateStatus(id: number, updateStatusDto: UpdateAppointmentStatusDto) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id }
    });

    if (!appointment) {
      throw new BadRequestException('Запись не найдена');
    }

    appointment.status = updateStatusDto.status;
    return this.appointmentRepository.save(appointment);
  }

  async initiateAppointment(appointmentData: any): Promise<{ verificationId: number }> {
    const code = this.smsService.generateVerificationCode();
    
    // Сохраняем код и данные записи
    const verification = await this.verificationRepository.save({
      phone: appointmentData.phone,
      code: code,
      appointmentData: JSON.stringify(appointmentData),
      isUsed: false,
    });

    // Отправляем SMS
    await this.smsService.sendSms(
      appointmentData.phone,
      `Ваш код подтверждения записи: ${code}`
    );

    return { verificationId: verification.id };
  }

  async verifyAndCreateAppointment(verificationId: number, code: string): Promise<any> {
    const verification = await this.verificationRepository.findOne({
      where: { id: verificationId }
    });

    if (!verification) {
      throw new HttpException('Код подтверждения не найден', HttpStatus.NOT_FOUND);
    }

    if (verification.isUsed) {
      throw new HttpException('Код уже был использован', HttpStatus.BAD_REQUEST);
    }

    const now = new Date();
    const expirationTime = new Date(verification.createdAt);
    expirationTime.setSeconds(expirationTime.getSeconds() + verification.expiresIn);

    if (now > expirationTime) {
      throw new HttpException('Код подтверждения истек', HttpStatus.BAD_REQUEST);
    }

    if (verification.code !== code) {
      throw new HttpException('Неверный код подтверждения', HttpStatus.BAD_REQUEST);
    }

    // Помечаем код как использованный
    await this.verificationRepository.update(verificationId, { isUsed: true });

    // Создаем запись на основе сохраненных данных
    const appointmentData = JSON.parse(verification.appointmentData);
    // TODO: Создание записи через существующий метод
    return this.create(appointmentData);
  }

  async getStatistics(userId: number) {
    const [upcoming, completed, services, specialists] = await Promise.all([
      this.appointmentRepository.count({
        where: {
          user: { id: userId },
          status: In(['pending', 'confirmed']),
          startTime: MoreThan(new Date())
        }
      }),
      this.appointmentRepository.count({
        where: {
          user: { id: userId },
          status: 'completed'
        }
      }),
      this.serviceRepository.count({
        where: { isActive: true }
      }),
      this.employeeRepository.count({
        where: { isActive: true }
      })
    ]);

    return {
      upcomingAppointments: upcoming,
      completedAppointments: completed,
      availableServices: services,
      activeSpecialists: specialists
    };
  }

  async rescheduleAppointment(id: number, newDateTime: Date) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['employee']
    });
    
    if (!appointment) {
      throw new NotFoundException('Запись не найдена');
    }

    const availability = await this.checkSlotAvailability(
      appointment.employee.id,
      newDateTime.toISOString()
    );

    if (!availability.available) {
      throw new BadRequestException(availability.reason);
    }

    appointment.startTime = newDateTime;
    appointment.endTime = new Date(newDateTime.getTime() + appointment.duration * 60000);

    return this.appointmentRepository.save(appointment);
  }
}

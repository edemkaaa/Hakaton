import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';

@Injectable()
export class EmployeeAvailabilityService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>
  ) {}

  async isAvailable(
    employeeId: number,
    startTime: Date,
    endTime: Date
  ): Promise<{ available: boolean; reason?: string }> {
    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
      relations: ['appointments']
    });

    if (!employee) {
      return { available: false, reason: 'Сотрудник не найден' };
    }

    // Проверка рабочего дня
    const dayOfWeek = startTime.getDay();
    const workSchedule = employee.workSchedule.find(
      schedule => schedule.dayOfWeek === dayOfWeek
    );

    if (!workSchedule) {
      return { available: false, reason: 'Выходной день' };
    }

    // Преобразование времени из расписания в Date
    const scheduleStart = new Date(startTime);
    const [startHours, startMinutes] = workSchedule.startTime.split(':');
    scheduleStart.setHours(parseInt(startHours), parseInt(startMinutes), 0, 0);

    const scheduleEnd = new Date(startTime);
    const [endHours, endMinutes] = workSchedule.endTime.split(':');
    scheduleEnd.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);

    // Проверка времени работы
    if (startTime < scheduleStart || endTime > scheduleEnd) {
      return { available: false, reason: 'Время вне рабочего графика' };
    }

    // Проверка перерыва
    if (workSchedule.breakStart && workSchedule.breakEnd) {
      const breakStart = new Date(startTime);
      const [breakStartHours, breakStartMinutes] = workSchedule.breakStart.split(':');
      breakStart.setHours(parseInt(breakStartHours), parseInt(breakStartMinutes), 0, 0);

      const breakEnd = new Date(startTime);
      const [breakEndHours, breakEndMinutes] = workSchedule.breakEnd.split(':');
      breakEnd.setHours(parseInt(breakEndHours), parseInt(breakEndMinutes), 0, 0);

      if (
        (startTime <= breakEnd && endTime >= breakStart) ||
        (startTime >= breakStart && startTime <= breakEnd) ||
        (endTime >= breakStart && endTime <= breakEnd)
      ) {
        return { available: false, reason: 'Время попадает на перерыв' };
      }
    }

    // Проверка существующих записей
    const existingAppointments = await this.appointmentRepository.find({
      where: [
        {
          employee: { id: employeeId },
          startTime: LessThanOrEqual(endTime),
          endTime: MoreThanOrEqual(startTime)
        }
      ]
    });

    if (existingAppointments.length > 0) {
      return { available: false, reason: 'Время уже занято' };
    }

    return { available: true };
  }

  async getAvailableSlots(
    employeeId: number,
    date: Date,
    duration: number // в минутах
  ): Promise<{ startTime: Date; endTime: Date }[]> {
    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
      relations: ['appointments']
    });

    if (!employee) {
      return [];
    }

    const dayOfWeek = date.getDay();
    const workSchedule = employee.workSchedule.find(
      schedule => schedule.dayOfWeek === dayOfWeek
    );

    if (!workSchedule) {
      return []; // Выходной день
    }

    const slots: { startTime: Date; endTime: Date }[] = [];
    const [startHours, startMinutes] = workSchedule.startTime.split(':');
    const [endHours, endMinutes] = workSchedule.endTime.split(':');

    const startTime = new Date(date);
    startTime.setHours(parseInt(startHours), parseInt(startMinutes), 0, 0);

    const endTime = new Date(date);
    endTime.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);

    // Получаем все записи на этот день
    const appointments = await this.appointmentRepository.find({
      where: {
        employee: { id: employeeId },
        startTime: Between(startTime, endTime)
      },
      order: {
        startTime: 'ASC'
      }
    });

    let currentTime = startTime;
    for (const appointment of appointments) {
      // Добавляем слот до следующей записи, если он достаточной длительности
      if (appointment.startTime.getTime() - currentTime.getTime() >= duration * 60000) {
        slots.push({
          startTime: new Date(currentTime),
          endTime: new Date(appointment.startTime)
        });
      }
      currentTime = new Date(appointment.endTime);
    }

    // Добавляем последний слот до конца рабочего дня
    if (endTime.getTime() - currentTime.getTime() >= duration * 60000) {
      slots.push({
        startTime: new Date(currentTime),
        endTime: new Date(endTime)
      });
    }

    return slots;
  }
}
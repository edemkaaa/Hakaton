import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Service } from '../services/entities/service.entity';
import { Employee } from '../employees/entities/employee.entity';
import { ServiceDirection } from '../services/entities/serviceDirection.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(ServiceDirection)
    private serviceDirectionRepository: Repository<ServiceDirection>,
  ) {}

  async seed() {
    await this.seedUsers();
    await this.seedServiceDirections();
    await this.seedServices();
    await this.seedEmployees();
  }

  private async seedUsers() {
    const adminExists = await this.userRepository.findOne({
      where: { email: 'admin@example.com' }
    });

    if (!adminExists) {
      const adminPassword = await bcrypt.hash('admin123', 10);
      await this.userRepository.save({
        firstName: 'Администратор',
        lastName: 'Системы',
        middleName: 'Администраторович',
        email: 'admin@example.com',
        password: adminPassword,
        role: 'admin',
        isActive: true,
      });
    }
  }

  private async seedServiceDirections() {
    const directions = [
      {
        name: 'Земельные вопросы',
        description: 'Услуги по земельным вопросам',
        isActive: true,
      },
      {
        name: 'Социальные услуги',
        description: 'Социальные услуги и выплаты',
        isActive: true,
      },
      {
        name: 'Предпринимательство',
        description: 'Услуги для предпринимателей',
        isActive: true,
      },
    ];

    for (const direction of directions) {
      const exists = await this.serviceDirectionRepository.findOne({
        where: { name: direction.name }
      });
      
      if (!exists) {
        await this.serviceDirectionRepository.save(direction);
      }
    }
  }

  private async seedServices() {
    const directions = await this.serviceDirectionRepository.find();
    
    const services = [
      {
        name: 'Консультация по земельным вопросам',
        description: 'Консультация специалиста по вопросам землепользования',
        duration: 30,
        isActive: true,
        direction: directions[0],
        workingHours: {
          monday: { start: '09:00', end: '18:00' },
          tuesday: { start: '09:00', end: '18:00' },
          wednesday: { start: '09:00', end: '18:00' },
          thursday: { start: '09:00', end: '18:00' },
          friday: { start: '09:00', end: '18:00' }
        }
      },
      {
        name: 'Оформление социальных выплат',
        description: 'Помощь в оформлении социальных выплат и пособий',
        duration: 45,
        isActive: true,
        direction: directions[1],
        workingHours: {
          monday: { start: '09:00', end: '18:00' },
          tuesday: { start: '09:00', end: '18:00' },
          wednesday: { start: '09:00', end: '18:00' },
          thursday: { start: '09:00', end: '18:00' },
          friday: { start: '09:00', end: '18:00' }
        }
      },
      {
        name: 'Регистрация предпринимательской деятельности',
        description: 'Помощь в регистрации ИП или ООО',
        duration: 60,
        isActive: true,
        direction: directions[2],
        workingHours: {
          monday: { start: '09:00', end: '18:00' },
          tuesday: { start: '09:00', end: '18:00' },
          wednesday: { start: '09:00', end: '18:00' },
          thursday: { start: '09:00', end: '18:00' },
          friday: { start: '09:00', end: '18:00' }
        }
      },
    ];

    for (const service of services) {
      const exists = await this.serviceRepository.findOne({
        where: { name: service.name }
      });
      
      if (!exists) {
        await this.serviceRepository.save(service);
      }
    }
  }

  private async seedEmployees() {
    const employees = [
      {
        firstName: 'Иван',
        lastName: 'Петров',
        middleName: 'Сергеевич',
        position: 'Специалист по земельным вопросам',
        email: 'petrov@example.com',
        phone: '+79001234567',
        isActive: true,
      },
      {
        firstName: 'Мария',
        lastName: 'Иванова',
        middleName: 'Александровна',
        position: 'Специалист социальной службы',
        email: 'ivanova@example.com',
        phone: '+79001234568',
        isActive: true,
      },
      {
        firstName: 'Алексей',
        lastName: 'Сидоров',
        middleName: 'Петрович',
        position: 'Специалист отдела предпринимательства',
        email: 'sidorov@example.com',
        phone: '+79001234569',
        isActive: true,
      },
    ];

    for (const employeeData of employees) {
      const exists = await this.employeeRepository.findOne({
        where: { email: employeeData.email } as any
      });
      
      if (!exists) {
        const newEmployee = this.employeeRepository.create(employeeData);
        await this.employeeRepository.save(newEmployee);
        
        const services = await this.serviceRepository.find();
        newEmployee.services = services;
        await this.employeeRepository.save(newEmployee);
      }
    }
  }
}

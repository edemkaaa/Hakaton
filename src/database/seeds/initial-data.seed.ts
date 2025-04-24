import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Service } from '../../services/entities/service.entity';
import { Employee } from '../../employees/entities/employee.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class InitialDataSeed {
  constructor(private connection: Connection) {}

  public async run(): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();

    // Создаем администратора
    const adminPassword = await bcrypt.hash('admin123', 10);
    await queryRunner.manager.save(User, {
      firstName: 'Администратор',
      lastName: 'Системы',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin',
      isActive: true,
    });

    // Создаем базовые услуги
    const services = await queryRunner.manager.save(Service, [
      {
        name: 'Консультация по земельным вопросам',
        description: 'Консультация специалиста по вопросам землепользования',
        duration: 30,
        isActive: true,
      },
      {
        name: 'Оформление социальных выплат',
        description: 'Помощь в оформлении социальных выплат и пособий',
        duration: 45,
        isActive: true,
      },
      {
        name: 'Регистрация предпринимательской деятельности',
        description: 'Помощь в регистрации ИП или ООО',
        duration: 60,
        isActive: true,
      },
    ]);

    // Создаем сотрудников
    const employees = await queryRunner.manager.save(Employee, [
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
    ]);

    // Связываем сотрудников с услугами
    for (const employee of employees) {
      employee.services = services;
      await queryRunner.manager.save(Employee, employee);
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({
      relations: ['user', 'services', 'appointments']
    });
  }

  async findOne(id: number): Promise<Employee | undefined> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['user', 'services', 'appointments']
    });
    return employee || undefined;
  }

  async create(employeeData: Partial<Employee>): Promise<Employee> {
    const employee = this.employeeRepository.create(employeeData);
    return this.employeeRepository.save(employee);
  }

  async update(id: number, employeeData: Partial<Employee>): Promise<Employee> {
    const employee = await this.findOne(id);
    if (!employee) {
      throw new NotFoundException(`Сотрудник с ID ${id} не найден`);
    }
    
    Object.assign(employee, employeeData);
    return this.employeeRepository.save(employee);
  }

  async remove(id: number): Promise<void> {
    const result = await this.employeeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Сотрудник с ID ${id} не найден`);
    }
  }

  async findByService(serviceId: number): Promise<Employee[]> {
    return this.employeeRepository.find({
      relations: ['services'],
      where: {
        services: {
          id: serviceId
        }
      }
    });
  }

  async getSchedule(id: number): Promise<any> {
    const employee = await this.findOne(id);
    if (!employee) {
      throw new NotFoundException(`Сотрудник с ID ${id} не найден`);
    }
    return employee.workSchedule;
  }

  async updateSchedule(id: number, schedule: any): Promise<Employee> {
    const employee = await this.findOne(id);
    if (!employee) {
      throw new NotFoundException(`Сотрудник с ID ${id} не найден`);
    }
    
    employee.workSchedule = schedule;
    return this.employeeRepository.save(employee);
  }
}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { EmployeeAvailabilityService } from './services/availability.service';
import { Employee } from './entities/employee.entity';
import { Appointment } from '../appointments/entities/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Appointment])],
  controllers: [EmployeesController],
  providers: [EmployeesService, EmployeeAvailabilityService],
  exports: [EmployeesService, EmployeeAvailabilityService],
})
export class EmployeesModule {}
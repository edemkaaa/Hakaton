import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { User } from '../users/entities/user.entity';
import { Service } from '../services/entities/service.entity';
import { Employee } from '../employees/entities/employee.entity';
import { Appointment } from '../appointments/entities/appointment.entity';
import { VerificationCode } from '../appointments/entities/verification-code.entity';
import { ServiceDirection } from '../services/entities/serviceDirection.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, 
      Service, 
      Employee, 
      Appointment, 
      VerificationCode,
      ServiceDirection
    ]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}

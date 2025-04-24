import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './entities/appointment.entity';
import { Employee } from '../employees/entities/employee.entity';
import { Service } from '../services/entities/service.entity';
import { VerificationCode } from './entities/verification-code.entity';
import { SmsModule } from '../sms/sms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment,
      Employee,
      Service,
      VerificationCode
    ]),
    SmsModule
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}

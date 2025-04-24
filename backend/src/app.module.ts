import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ServicesModule } from './services/services.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { AuthModule } from './auth/auth.module';
import { SmsModule } from './sms/sms.module';
import { SeederModule } from './database/seeder.module';
import { SeedCommand, SeedCommandHandler } from './commands/seed.command';

import { User } from './users/entities/user.entity';
import { Service } from './services/entities/service.entity';
import { Subservice } from './services/entities/subservice.entity';
import { Employee } from './employees/entities/employee.entity';
import { Appointment } from './appointments/entities/appointment.entity';
import { VerificationCode } from './appointments/entities/verification-code.entity';
import { Notification } from './notifications/entities/notification.entity';
import { ServiceDirection } from './services/entities/serviceDirection.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CqrsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'appointment_system',
      entities: [User, Service, Subservice, Employee, Appointment, VerificationCode, Notification, ServiceDirection],
      synchronize: false,  
    }),
    UsersModule,
    AuthModule,
    AppointmentsModule,
    ServicesModule,
    NotificationsModule,
    SmsModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SeedCommand,
    SeedCommandHandler,
  ],
})
export class AppModule {}

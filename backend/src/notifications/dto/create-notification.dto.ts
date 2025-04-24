import { IsString, IsNotEmpty, IsEnum, IsObject, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({ 
    description: 'ID пользователя',
    example: 1,
    type: Number
  })
  @IsNumber()
  userId: number;

  @ApiProperty({ 
    description: 'Заголовок уведомления',
    example: 'Подтверждение записи',
    type: String
  })
  @IsString()
  title: string;

  @ApiProperty({ 
    description: 'Текст уведомления',
    example: 'Ваша запись на прием подтверждена',
    type: String
  })
  @IsString()
  message: string;

  @ApiProperty({ 
    description: 'Тип уведомления',
    enum: ['appointment_created', 'appointment_updated', 'appointment_cancelled', 'reminder'],
    example: 'appointment_created',
    type: String
  })
  @IsEnum(['appointment_created', 'appointment_updated', 'appointment_cancelled', 'reminder'])
  type: string;

  @ApiProperty({ 
    description: 'Дополнительные метаданные',
    example: {
      "appointmentId": 1,
      "appointmentTime": "2024-01-20T10:00:00.000Z",
      "employeeName": "Иванов Иван Иванович"
    },
    required: false
  })
  @IsOptional()
  metadata?: any;
}
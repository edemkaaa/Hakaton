import { IsNumber, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ 
    description: 'ID пользователя',
    example: 1,
    type: Number
  })
  @IsNumber()
  userId: number;

  @ApiProperty({ 
    description: 'ID специалиста',
    example: 1,
    type: Number
  })
  @IsNumber()
  employeeId: number;

  @ApiProperty({ 
    description: 'ID услуги',
    example: 1,
    type: Number
  })
  @IsNumber()
  serviceId: number;

  @ApiProperty({ 
    description: 'Время записи',
    example: '2024-01-20T10:00:00.000Z',
    type: String
  })
  @IsDateString()
  appointmentTime: string;

  @ApiProperty({ 
    description: 'Дополнительная информация',
    example: {
      "comment": "Первичный прием",
      "documents": ["паспорт", "СНИЛС"],
      "preferredLanguage": "русский"
    },
    required: false
  })
  @IsOptional()
  additionalInfo?: any;
}
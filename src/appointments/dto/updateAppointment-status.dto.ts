import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class UpdateAppointmentStatusDto {
  @ApiProperty({ 
    description: 'Статус записи',
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no_show'],
    example: 'confirmed',
    type: String
  })
  @IsEnum(['pending', 'confirmed', 'completed', 'cancelled', 'no_show'])
  status: string;
}
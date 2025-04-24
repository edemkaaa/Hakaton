import { IsNumber, IsDateString, IsOptional, IsPositive, ValidateNested, IsObject, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class AdditionalInfoDto {
  @IsOptional()
  @IsString({ message: 'Комментарий должен быть строкой' })
  comment?: string;

  @IsOptional()
  @IsArray({ message: 'Документы должны быть массивом' })
  @IsString({ each: true, message: 'Каждый документ должен быть строкой' })
  documents?: string[];

  @IsOptional()
  @IsString({ message: 'Предпочитаемый язык должен быть строкой' })
  preferredLanguage?: string;
}

export class CreateAppointmentDto {
  @ApiProperty({ 
    description: 'ID пользователя',
    example: 1,
    type: Number
  })
  @IsNumber({}, { message: 'ID пользователя должен быть числом' })
  @IsPositive({ message: 'ID пользователя должен быть положительным числом' })
  @Type(() => Number)
  userId: number;

  @ApiProperty({ 
    description: 'ID специалиста',
    example: 1,
    type: Number
  })
  @IsNumber({}, { message: 'ID специалиста должен быть числом' })
  @IsPositive({ message: 'ID специалиста должен быть положительным числом' })
  @Type(() => Number)
  employeeId: number;

  @ApiProperty({ 
    description: 'ID услуги',
    example: 1,
    type: Number
  })
  @IsNumber({}, { message: 'ID услуги должен быть числом' })
  @IsPositive({ message: 'ID услуги должен быть положительным числом' })
  @Type(() => Number)
  serviceId: number;

  @ApiProperty({ 
    description: 'Время записи',
    example: '2024-01-20T10:00:00.000Z',
    type: String
  })
  @IsDateString({}, { message: 'Некорректный формат даты и времени' })
  appointmentTime: string;

  @ApiProperty({ 
    description: 'Дополнительная информация',
    example: {
      "comment": "Первичный прием",
      "documents": ["паспорт", "СНИЛС"],
      "preferredLanguage": "русский"
    },
    required: false,
    type: AdditionalInfoDto
  })
  @IsOptional()
  @IsObject({ message: 'Дополнительная информация должна быть объектом' })
  @ValidateNested()
  @Type(() => AdditionalInfoDto)
  additionalInfo?: AdditionalInfoDto;
}

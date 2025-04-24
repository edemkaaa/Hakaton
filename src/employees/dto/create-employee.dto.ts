import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsBoolean, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class WorkScheduleDto {
  @ApiProperty({ 
    description: 'День недели (0-6, где 0 - воскресенье)',
    example: 1
  })
  @IsNumber()
  dayOfWeek: number;

  @ApiProperty({ 
    description: 'Время начала работы',
    example: "09:00"
  })
  @IsString()
  startTime: string;

  @ApiProperty({ 
    description: 'Время окончания работы',
    example: "18:00"
  })
  @IsString()
  endTime: string;

  @ApiProperty({ 
    description: 'Время начала перерыва',
    example: "13:00",
    required: false
  })
  @IsOptional()
  @IsString()
  breakStart?: string;

  @ApiProperty({ 
    description: 'Время окончания перерыва',
    example: "14:00",
    required: false
  })
  @IsOptional()
  @IsString()
  breakEnd?: string;
}

export class CreateEmployeeDto {
  @ApiProperty({ 
    description: 'ID пользователя в системе',
    example: 1
  })
  @IsNumber()
  userId: number;

  @ApiProperty({ 
    description: 'Должность сотрудника',
    example: "Специалист отдела социальной поддержки",
    required: false
  })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiProperty({ 
    description: 'Ссылка на фотографию сотрудника',
    example: "https://example.com/photo.jpg",
    required: false
  })
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiProperty({ 
    description: 'ID услуг, которые оказывает сотрудник',
    example: [1, 2, 3],
    type: [Number]
  })
  @IsArray()
  @IsNumber({}, { each: true })
  serviceIds: number[];

  @ApiProperty({ 
    description: 'Расписание работы',
    type: [WorkScheduleDto]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkScheduleDto)
  workSchedule: WorkScheduleDto[];

  @ApiProperty({ 
    description: 'Статус активности',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
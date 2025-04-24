import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsBoolean, ValidateNested, IsNumber, IsUrl, ArrayMinSize, IsPositive } from 'class-validator';
import { Type, Transform} from 'class-transformer'; 

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
  @IsNumber({}, { message: 'ID пользователя должен быть числом' })
  @IsPositive({ message: 'ID пользователя должен быть положительным числом' })
  @Type(() => Number)
  userId: number;

  @ApiProperty({ 
    description: 'Должность сотрудника',
    example: "Специалист отдела социальной поддержки",
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Должность должна быть строкой' })
  @Transform(({ value }) => value?.trim())
  position?: string;

  @ApiProperty({ 
    description: 'Ссылка на фотографию сотрудника',
    example: "https://example.com/photo.jpg",
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Ссылка на фото должна быть строкой' })
  @IsUrl({}, { message: 'Некорректный формат URL' })
  photo?: string;

  @ApiProperty({ 
    description: 'ID услуг, которые оказывает сотрудник',
    example: [1, 2, 3],
    type: [Number]
  })
  @IsArray({ message: 'Список услуг должен быть массивом' })
  @ArrayMinSize(1, { message: 'Необходимо указать хотя бы одну услугу' })
  @IsNumber({}, { each: true, message: 'ID услуги должен быть числом' })
  @IsPositive({ each: true, message: 'ID услуги должен быть положительным числом' })
  @Type(() => Number)
  serviceIds: number[];

  @ApiProperty({ 
    description: 'Расписание работы',
    type: [WorkScheduleDto]
  })
  @IsArray({ message: 'Расписание должно быть массивом' })
  @ValidateNested({ each: true })
  @Type(() => WorkScheduleDto)
  workSchedule: WorkScheduleDto[];

  @ApiProperty({ 
    description: 'Статус активности',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean({ message: 'Статус активности должен быть логическим значением' })
  isActive?: boolean;
}

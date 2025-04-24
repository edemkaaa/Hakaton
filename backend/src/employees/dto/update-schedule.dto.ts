import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ScheduleItemDto {
  @ApiProperty({ 
    description: 'День недели (0-6, где 0 - воскресенье)',
    example: 1
  })
  dayOfWeek: number;

  @ApiProperty({ 
    description: 'Время начала работы',
    example: "09:00"
  })
  startTime: string;

  @ApiProperty({ 
    description: 'Время окончания работы',
    example: "18:00"
  })
  endTime: string;

  @ApiProperty({ 
    description: 'Время начала перерыва',
    example: "13:00",
    required: false
  })
  breakStart?: string;

  @ApiProperty({ 
    description: 'Время окончания перерыва',
    example: "14:00",
    required: false
  })
  breakEnd?: string;
}

export class UpdateScheduleDto {
  @ApiProperty({ 
    description: 'Расписание работы по дням недели',
    type: [ScheduleItemDto]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleItemDto)
  schedule: ScheduleItemDto[];
}
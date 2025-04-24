import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateSubserviceDto {
  @ApiProperty({ description: 'Название подуслуги' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Описание подуслуги' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Длительность подуслуги в минутах' })
  @IsNumber()
  duration: number;
}
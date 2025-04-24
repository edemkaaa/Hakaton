import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsPositive, ArrayMinSize, ArrayUnique, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class AssignServicesDto {
  @ApiProperty({ 
    description: 'ID сотрудника',
    example: 1
  })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  employeeId: number;

  @ApiProperty({ 
    description: 'Массив ID услуг для назначения сотруднику',
    example: [1, 2, 3],
    type: [Number]
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'Необходимо указать хотя бы одну услугу' })
  @IsNumber({}, { each: true, message: 'Каждый элемент должен быть числом' })
  @IsPositive({ each: true, message: 'ID услуги должен быть положительным числом' })
  @ArrayUnique({ message: 'ID услуг должны быть уникальными' })
  @Type(() => Number)
  serviceIds: number[];
}

export class RemoveServicesDto {
  @ApiProperty({ 
    description: 'ID сотрудника',
    example: 1
  })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  employeeId: number;

  @ApiProperty({ 
    description: 'Массив ID услуг для удаления у сотрудника',
    example: [1, 2],
    type: [Number]
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'Необходимо указать хотя бы одну услугу' })
  @IsNumber({}, { each: true, message: 'Каждый элемент должен быть числом' })
  @IsPositive({ each: true, message: 'ID услуги должен быть положительным числом' })
  @ArrayUnique({ message: 'ID услуг должны быть уникальными' })
  @Type(() => Number)
  serviceIds: number[];
}

export class GetEmployeeServicesQueryDto {
  @ApiProperty({ 
    description: 'ID сотрудника',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  employeeId?: number;

  @ApiProperty({ 
    description: 'ID услуги',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  serviceId?: number;
}

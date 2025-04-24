 import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/employee.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@ApiTags('Сотрудники')
@ApiBearerAuth()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @ApiOperation({ summary: 'Получить всех сотрудников' })
  @ApiResponse({ status: 200, description: 'Список сотрудников получен' })
  @Get()
  findAll(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }

  @ApiOperation({ summary: 'Получить сотрудника по ID' })
  @ApiResponse({ status: 200, description: 'Сотрудник найден' })
  @ApiResponse({ status: 404, description: 'Сотрудник не найден' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Employee> {
    const employee = await this.employeesService.findOne(+id);
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Создать нового сотрудника' })
  @ApiResponse({ status: 201, description: 'Сотрудник создан' })
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeesService.create(createEmployeeDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Обновить данные сотрудника' })
  @ApiResponse({ status: 200, description: 'Данные сотрудника обновлены' })
  @ApiResponse({ status: 404, description: 'Сотрудник не найден' })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ): Promise<Employee> {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Удалить сотрудника' })
  @ApiResponse({ status: 200, description: 'Сотрудник удален' })
  @ApiResponse({ status: 404, description: 'Сотрудник не найден' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.employeesService.remove(+id);
  }

  @ApiOperation({ summary: 'Получить расписание сотрудника' })
  @ApiResponse({ status: 200, description: 'Расписание получено' })
  @ApiResponse({ status: 404, description: 'Сотрудник не найден' })
  @Get(':id/schedule')
  getSchedule(@Param('id') id: string) {
    return this.employeesService.getSchedule(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Обновить расписание сотрудника' })
  @ApiResponse({ status: 200, description: 'Расписание обновлено' })
  @ApiResponse({ status: 404, description: 'Сотрудник не найден' })
  @Put(':id/schedule')
  updateSchedule(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto
  ): Promise<Employee> {
    return this.employeesService.updateSchedule(+id, updateScheduleDto.schedule);
  }
}
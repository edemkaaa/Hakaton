import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentStatusDto } from './dto/updateAppointment-status.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
const apiTags = ApiTags;

@apiTags('Запись')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать запись' })
  @ApiResponse({ status: 201, description: 'Запись создана' })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get('availableSlots/:employeeId/:date')
  @ApiOperation({ summary: 'Получить все свободные записи' })
  @ApiResponse({ status: 200, description: 'Список свободных записей получен' })
  getAvailableSlots(
    @Param('employeeId') employeeId: number,
    @Param('date') date: string,
  ) {
    return this.appointmentsService.getAvailableSlots(employeeId, date);
  }

  @Get('employee/:employeeId')
  @ApiOperation({ summary: 'Получить все записи' })
  @ApiResponse({ status: 200, description: 'Список записей получен' })
  getEmployeeAppointments(@Param('employeeId') employeeId: number) {
    return this.appointmentsService.findByEmployee(employeeId);
  }

  @Put(':id/status')
  updateStatus(
    @Param('id') id: number,
    @Body() updateStatusDto: UpdateAppointmentStatusDto,
  ) {
    return this.appointmentsService.updateStatus(id, updateStatusDto);
  }

  @Post('initiate')
  @ApiOperation({ summary: 'Инициировать запись с подтверждением по SMS' })
  @ApiResponse({ status: 201, description: 'Код подтверждения отправлен' })
  async initiateAppointment(@Body() appointmentData: any) {
    return this.appointmentsService.initiateAppointment(appointmentData);
  }

  @Post('verify')
  @HttpCode(200)
  @ApiOperation({ summary: 'Подтвердить запись по SMS коду' })
  @ApiResponse({ status: 200, description: 'Запись подтверждена и создана' })
  async verifyAppointment(
    @Body() verificationData: { verificationId: number; code: string }
  ) {
    return this.appointmentsService.verifyAndCreateAppointment(
      verificationData.verificationId,
      verificationData.code
    );
  }
}

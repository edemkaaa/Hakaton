import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { Service } from './entities/service.entity';
import { Subservice } from './entities/subservice.entity';
import { CreateSubserviceDto } from './dto/create-subservice.dto';
import { UpdateSubserviceDto } from './dto/update-subservice.dto';

@ApiTags('Услуги')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @ApiOperation({ summary: 'Получить все услуги' })
  @ApiResponse({ status: 200, description: 'Список услуг получен' })
  @Get()
  findAll() {
    return [];
  }

  @ApiOperation({ summary: 'Получить услугу по ID' })
  @ApiResponse({ status: 200, description: 'Услуга найдена' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return {};
  }

  @ApiOperation({ summary: 'Создать новую услугу' })
  @ApiResponse({ status: 201, description: 'Услуга создана' })
  @Post()
  create(@Body() createServiceDto: any) {
    return {};
  }

  @ApiOperation({ summary: 'Обновить услугу' })
  @ApiResponse({ status: 200, description: 'Услуга обновлена' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: any) {
    return {};
  }

  @ApiOperation({ summary: 'Удалить услугу' })
  @ApiResponse({ status: 200, description: 'Услуга удалена' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return {};
  }

  @ApiOperation({ summary: 'Получить все подуслуги для услуги' })
  @ApiResponse({ status: 200, description: 'Список подуслуг получен' })
  @Get(':serviceId/subservices')
  getSubservices(@Param('serviceId') serviceId: string): Promise<Subservice[]> {
    return this.servicesService.getSubservices(+serviceId);
  }

  @ApiOperation({ summary: 'Получить подуслугу по ID' })
  @ApiResponse({ status: 200, description: 'Подуслуга найдена' })
  @ApiResponse({ status: 404, description: 'Подуслуга не найдена' })
  @Get(':serviceId/subservices/:id')
  async getSubservice(
    @Param('serviceId') serviceId: string,
    @Param('id') id: string
  ): Promise<Subservice> {
    const subservice = await this.servicesService.findSubservice(+id);
    if (!subservice) {
      throw new NotFoundException(`Подуслуга с ID ${id} не найдена`);
    }
    return subservice;
  }

  @ApiOperation({ summary: 'Создать новую подуслугу' })
  @ApiResponse({ status: 201, description: 'Подуслуга создана' })
  @Post(':serviceId/subservices')
  createSubservice(
    @Param('serviceId') serviceId: string,
    @Body() createSubserviceDto: CreateSubserviceDto
  ): Promise<Subservice> {
    return this.servicesService.createSubservice(+serviceId, createSubserviceDto);
  }

  @ApiOperation({ summary: 'Обновить подуслугу' })
  @ApiResponse({ status: 200, description: 'Подуслуга обновлена' })
  @Put(':serviceId/subservices/:id')
  updateSubservice(
    @Param('serviceId') serviceId: string,
    @Param('id') id: string,
    @Body() updateSubserviceDto: UpdateSubserviceDto
  ): Promise<Subservice> {
    return this.servicesService.updateSubservice(+id, updateSubserviceDto);
  }

  @ApiOperation({ summary: 'Удалить подуслугу' })
  @ApiResponse({ status: 200, description: 'Подуслуга удалена' })
  @Delete(':serviceId/subservices/:id')
  async removeSubservice(
    @Param('serviceId') serviceId: string,
    @Param('id') id: string
  ): Promise<void> {
    return this.servicesService.removeSubservice(+id);
  }
}

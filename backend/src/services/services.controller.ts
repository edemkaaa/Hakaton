import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Услуги')
@Controller('services')
export class ServicesController {
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
}
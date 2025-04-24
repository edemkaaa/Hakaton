import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, description: 'Список пользователей получен' })
  @Get()
  findAll() {
    return [];
  }

  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @ApiResponse({ status: 200, description: 'Пользователь найден' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return {};
  }

  @ApiOperation({ summary: 'Создать нового пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь создан' })
  @Post()
  create(@Body() createUserDto: any) {
    return {};
  }

  @ApiOperation({ summary: 'Обновить данные пользователя' })
  @ApiResponse({ status: 200, description: 'Данные обновлены' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return {};
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь удален' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return {};
  }
}
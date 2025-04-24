import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Уведомления')
@Controller('notifications')
export class NotificationsController {
  @ApiOperation({ summary: 'Получить все уведомления пользователя' })
  @ApiResponse({ status: 200, description: 'Список уведомлений получен' })
  @Get('user/:userId')
  findAllForUser(@Param('userId') userId: string) {
    return [];
  }

  @ApiOperation({ summary: 'Отправить уведомление' })
  @ApiResponse({ status: 201, description: 'Уведомление отправлено' })
  @Post()
  create(@Body() createNotificationDto: any) {
    return {};
  }

  @ApiOperation({ summary: 'Отметить уведомление как прочитанное' })
  @ApiResponse({ status: 200, description: 'Статус уведомления обновлен' })
  @Post(':id/read')
  markAsRead(@Param('id') id: string) {
    return {};
  }
}
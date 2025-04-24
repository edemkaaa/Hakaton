import { Controller, Get, Query, Redirect, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EsiaService } from '../services/esia.service';

@ApiTags('Авторизация через Госуслуги')
@Controller('auth/esia')
export class EsiaController {
  constructor(private readonly esiaService: EsiaService) {}

  @Get('login')
  @ApiOperation({ summary: 'Получить ссылку для авторизации через Госуслуги' })
  @ApiResponse({ status: 302, description: 'Редирект на страницу авторизации Госуслуг' })
  @Redirect()
  async login() {
    try {
      const url = await this.esiaService.getAuthorizationUrl();
      return { url, statusCode: 302 };
    } catch (error) {
      throw new HttpException(
        'Ошибка получения ссылки авторизации ЕСИА',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('callback')
  @ApiOperation({ summary: 'Обработка callback от Госуслуг' })
  @ApiResponse({ status: 200, description: 'Успешная авторизация' })
  async callback(@Query('code') code: string) {
    if (!code) {
      throw new HttpException(
        'Отсутствует код авторизации',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.esiaService.handleCallback(code);
  }
}

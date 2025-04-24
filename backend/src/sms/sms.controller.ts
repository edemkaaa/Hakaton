import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SmsService } from './sms.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('SMS')
@Controller('sms')
@UseGuards(AuthGuard('jwt'))
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('test')
  @ApiOperation({ summary: 'Отправить тестовое SMS' })
  @ApiResponse({ status: 200, description: 'SMS отправлено успешно' })
  async sendTestSms(
    @Body() data: { phone: string; message: string },
  ) {
    const result = await this.smsService.sendSms(data.phone, data.message);
    return { success: result };
  }

  @Get('balance')
  @ApiOperation({ summary: 'Проверить баланс SMSC' })
  @ApiResponse({
    status: 200,
    description: 'Баланс получен успешно',
    schema: {
      type: 'object',
      properties: {
        balance: { type: 'number', description: 'Текущий баланс' },
        currency: { type: 'string', description: 'Валюта баланса' },
        credit: { type: 'number', description: 'Доступный кредит (если есть)', nullable: true },
        error: { type: 'string', description: 'Сообщение об ошибке (если есть)', nullable: true }
      }
    }
  })
  async getBalance() {
    return this.smsService.checkBalance();
  }
}

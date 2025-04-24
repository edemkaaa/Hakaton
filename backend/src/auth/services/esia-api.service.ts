import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EsiaApiService {
  constructor(private configService: ConfigService) {}

  async getAuthLink(redirectUri: string): Promise<string> {
    // Мок ссылки для авторизации
    return `http://localhost:3000/mock-esia-login?redirect=${redirectUri}`;
  }

  async getTokens(code: string) {
    // Мок токенов
    return {
      access_token: 'mock_access_token',
      refresh_token: 'mock_refresh_token'
    };
  }

  async getUserInfo(tokens: any) {
    // Мок данных пользователя
    return {
      id: 'test_esia_id_' + Date.now(),
      firstName: 'Иван',
      lastName: 'Петров',
      surName: 'Сергеевич',
      email: {
        value: 'test@example.com'
      }
    };
  }
}

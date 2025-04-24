import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EsiaApiService } from './esia-api.service';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';

@Injectable()
export class EsiaService {
  private esiaApi: EsiaApiService;

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private usersService: UsersService,
  ) {
    this.esiaApi = new EsiaApiService(this.configService);
  }

  async getAuthorizationUrl(): Promise<string> {
    try {
      const redirectUri = this.configService.get<string>('esia.redirectUri');
      return await this.esiaApi.getAuthLink(redirectUri || '');
    } catch (error) {
      throw new HttpException(
        'Ошибка получения ссылки авторизации ЕСИА',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async handleCallback(code: string) {
    try {
      // Получаем токены
      const tokens = await this.esiaApi.getTokens(code);
      
      // Получаем информацию о пользователе
      const esiaUserInfo = await this.esiaApi.getUserInfo(tokens);

      // Ищем пользователя по ЕСИА ID
      let user = await this.usersService.findByEsiaId(esiaUserInfo.id);

      if (!user) {
        // Создаем нового пользователя
        user = await this.usersService.create({
          firstName: esiaUserInfo.firstName,
          lastName: esiaUserInfo.lastName,
          middleName: esiaUserInfo.surName,
          email: esiaUserInfo.email?.value,
          esiaId: esiaUserInfo.id,
          role: 'user',
        });
      }

      // Генерируем JWT токен
      const { access_token } = await this.authService.login(user);

      return {
        access_token,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      };
    } catch (error) {
      throw new HttpException(
        'Ошибка авторизации через ЕСИА',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}

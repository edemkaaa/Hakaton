import { Controller, Post, Body, UseGuards, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService, 
    private readonly usersService: UsersService
  ) {
    this.logger.log('AuthController initialized'); // Добавляем лог при инициализации
  }

  @Post('login')
  @ApiOperation({ summary: 'Вход в систему' })
  @ApiResponse({ 
    status: 200, 
    description: 'Успешная аутентификация',
    schema: {
      properties: {
        access_token: { type: 'string' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Неверные учетные данные' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Неверные учетные данные');
    }
    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({ 
    status: 201, 
    description: 'Пользователь успешно зарегистрирован',
    schema: {
      properties: {
        access_token: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Некорректные данные'
  })
  async register(@Body() registerDto: RegisterDto) {
    this.logger.log('Register endpoint called'); // Добавляем лог при вызове метода
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    const user = await this.usersService.create({
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      middleName: registerDto.middleName,
      email: registerDto.email,
      password: hashedPassword,
      role: 'user',
      document: {
        type: 'passport',
        series: registerDto.passportSeries,
        number: registerDto.passportNumber,
        snils: registerDto.snils
      }
    });

    return this.authService.login(user);
  }
}

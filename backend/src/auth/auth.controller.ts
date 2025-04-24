import { 
  Controller, 
  Post, 
  Body, 
  UseGuards, 
  UnauthorizedException, 
  Logger,
  HttpException,
  HttpStatus,
  ConflictException
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';

interface ErrorResponse {
  message: string;
  stack?: string;
  [key: string]: any;
}

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  private handleError(error: unknown): ErrorResponse {
    const errorResponse: ErrorResponse = {
      message: 'An unknown error occurred'
    };

    if (error instanceof Error) {
      errorResponse.message = error.message;
      errorResponse.stack = error.stack;
    } else if (typeof error === 'string') {
      errorResponse.message = error;
    } else {
      errorResponse.error = String(error);
    }

    return errorResponse;
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
    try {
      this.logger.log({
        message: 'Попытка входа в систему',
        email: loginDto.username
      });

      const user = await this.authService.validateUser(
        loginDto.username,
        loginDto.password,
      );

      if (!user) {
        this.logger.warn({
          message: 'Неудачная попытка входа',
          email: loginDto.username,
          reason: 'Неверные учетные данные'
        });
        throw new UnauthorizedException({
          message: 'Неверный email или пароль',
          error: 'INVALID_CREDENTIALS'
        });
      }

      const result = await this.authService.login(user);
      
      this.logger.log({
        message: 'Успешный вход в систему',
        userId: user.id,
        email: loginDto.username
      });

      return result;
    } catch (error: unknown) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      
      const errorResponse = this.handleError(error);
      this.logger.error({
        message: 'Ошибка при попытке входа',
        error: errorResponse.message,
        stack: errorResponse.stack
      });

      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Произошла внутренняя ошибка сервера',
        message: 'Не удалось выполнить вход в систему'
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('register')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({ 
    status: 201, 
    description: 'Пользователь успешно зарегистрирован'
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Некорректные данные'
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Пользователь с таким email уже существует'
  })
  async register(@Body() registerDto: RegisterDto) {
    try {
      this.logger.log({
        message: 'Попытка регистрации',
        email: registerDto.email
      });

      // Check if user exists by email
      const existingUser = await this.usersService.findByUsername(registerDto.email);

      if (existingUser) {
        this.logger.warn({
          message: 'Попытка регистрации с существующим email',
          email: registerDto.email
        });
        throw new ConflictException({
          message: 'Пользователь с таким email уже существует',
          error: 'EMAIL_EXISTS'
        });
      }

      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      
      // Create user with required fields
      const user = await this.usersService.create({
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        middleName: registerDto.middleName,
        email: registerDto.email,
        password: hashedPassword,
        role: 'user',
        isActive: true,
        document: {
          type: 'passport',
          series: registerDto.passportSeries,
          number: registerDto.passportNumber,
          snils: registerDto.snils
        }
      });

      const result = await this.authService.login(user);

      this.logger.log({
        message: 'Успешная регистрация пользователя',
        userId: user.id,
        email: user.email
      });

      // Return only necessary user information
      return {
        ...result,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      };
    } catch (error: unknown) {
      // Log detailed error for debugging
      this.logger.error({
        message: 'Ошибка при регистрации пользователя',
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        data: {
          email: registerDto.email,
          firstName: registerDto.firstName,
          lastName: registerDto.lastName
        }
      });

      if (error instanceof ConflictException) {
        throw error;
      }

      // Add more specific error handling
      if (error instanceof Error) {
        if (error.message.includes('duplicate key')) {
          throw new ConflictException({
            message: 'Пользователь с таким email уже существует',
            error: 'EMAIL_EXISTS'
          });
        }
      }

      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Произошла внутренняя ошибка сервера',
        message: 'Не удалось зарегистрировать пользователя'
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

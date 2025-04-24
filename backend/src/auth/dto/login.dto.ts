import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ 
    description: 'Имя пользователя',
    example: 'user@example.com'
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ 
    description: 'Пароль',
    example: 'password123'
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
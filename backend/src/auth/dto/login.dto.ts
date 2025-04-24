import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @ApiProperty({ 
    description: 'Email пользователя',
    example: 'user@example.com'
  })
  @IsEmail({}, { message: 'Некорректный email' })
  @IsNotEmpty({ message: 'Email обязателен' })
  @MaxLength(255, { message: 'Email не может быть длиннее 255 символов' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  username: string;

  @ApiProperty({ 
    description: 'Пароль',
    example: 'Password123!'
  })
  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль обязателен' })
  @MinLength(8, { message: 'Пароль должен содержать минимум 8 символов' })
  @MaxLength(72, { message: 'Пароль не может быть длиннее 72 символов' })
  password: string;
}

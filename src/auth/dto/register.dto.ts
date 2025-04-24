import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, Matches, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ 
    description: 'Имя пользователя',
    example: 'Иван'
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ 
    description: 'Фамилия пользователя',
    example: 'Иванов'
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ 
    description: 'Отчество пользователя',
    example: 'Иванович'
  })
  @IsString()
  @IsNotEmpty()
  middleName: string;

  @ApiProperty({ 
    description: 'Email пользователя',
    example: 'ivan@example.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({ 
    description: 'Пароль',
    example: 'Password123!'
  })
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Пароль слишком простой'
  })
  password: string;

  @ApiProperty({ 
    description: 'Серия паспорта',
    example: '1234'
  })
  @IsString()
  @Matches(/^\d{4}$/, {
    message: 'Серия паспорта должна состоять из 4 цифр'
  })
  passportSeries: string;

  @ApiProperty({ 
    description: 'Номер паспорта',
    example: '567890'
  })
  @IsString()
  @Matches(/^\d{6}$/, {
    message: 'Номер паспорта должен состоять из 6 цифр'
  })
  passportNumber: string;

  @ApiProperty({ 
    description: 'Номер СНИЛС',
    example: '123-456-789 00'
  })
  @IsString()
  @Matches(/^\d{3}-\d{3}-\d{3} \d{2}$/, {
    message: 'СНИЛС должен быть в формате XXX-XXX-XXX XX'
  })
  snils: string;
}
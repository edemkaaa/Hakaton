import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, Matches, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @ApiProperty({ 
    description: 'Имя пользователя',
    example: 'Иван'
  })
  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя обязательно' })
  @Transform(({ value }) => value?.trim())
  firstName: string;

  @ApiProperty({ 
    description: 'Фамилия пользователя',
    example: 'Иванов'
  })
  @IsString({ message: 'Фамилия должна быть строкой' })
  @IsNotEmpty({ message: 'Фамилия обязательна' })
  @Transform(({ value }) => value?.trim())
  lastName: string;

  @ApiProperty({ 
    description: 'Отчество пользователя',
    example: 'Иванович'
  })
  @IsString({ message: 'Отчество должно быть строкой' })
  @IsNotEmpty({ message: 'Отчество обязательно' })
  @Transform(({ value }) => value?.trim())
  middleName: string;

  @ApiProperty({ 
    description: 'Email пользователя',
    example: 'ivan@example.com'
  })
  @IsEmail({}, { message: 'Некорректный email' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  @ApiProperty({ 
    description: 'Пароль',
    example: 'Password123!'
  })
  @IsString({ message: 'Пароль должен быть строкой' })
  @MinLength(8, { message: 'Пароль должен содержать минимум 8 символов' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Пароль должен содержать заглавные и строчные буквы, цифры или специальные символы'
  })
  password: string;

  @ApiProperty({ 
    description: 'Серия паспорта',
    example: '1234'
  })
  @IsString({ message: 'Серия паспорта должна быть строкой' })
  @Matches(/^\d{4}$/, {
    message: 'Серия паспорта должна состоять из 4 цифр'
  })
  passportSeries: string;

  @ApiProperty({ 
    description: 'Номер паспорта',
    example: '567890'
  })
  @IsString({ message: 'Номер паспорта должен быть строкой' })
  @Matches(/^\d{6}$/, {
    message: 'Номер паспорта должен состоять из 6 цифр'
  })
  passportNumber: string;

  @ApiProperty({ 
    description: 'Номер СНИЛС',
    example: '123-456-789 00'
  })
  @IsString({ message: 'СНИЛС должен быть строкой' })
  @Matches(/^\d{3}-\d{3}-\d{3} \d{2}$/, {
    message: 'СНИЛС должен быть в формате XXX-XXX-XXX XX'
  })
  snils: string;
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Appointment } from '../../appointments/entities/appointment.entity';

@Entity()
export class User {
  @ApiProperty({ 
    description: 'Уникальный идентификатор пользователя',
    example: 1
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ 
    description: 'Имя пользователя',
    example: 'Иван'
  })
  @Column()
  firstName: string;

  @ApiProperty({ 
    description: 'Фамилия пользователя',
    example: 'Иванов'
  })
  @Column()
  lastName: string;

  @ApiProperty({ 
    description: 'Отчество пользователя',
    example: 'Иванович'
  })
  @Column()
  middleName: string;

  @ApiProperty({ 
    description: 'Email пользователя',
    example: 'ivan@example.com',
    uniqueItems: true
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ 
    description: 'Хешированный пароль пользователя',
    example: '$2b$10$...'
  })
  @Column()
  password: string;

  @ApiProperty({ 
    description: 'Роль пользователя в системе',
    enum: ['user', 'employee', 'admin'],
    example: 'user'
  })
  @Column({
    type: 'enum',
    enum: ['user', 'employee', 'admin'],
    default: 'user'
  })
  role: string;

  @ApiProperty({ 
    description: 'Документ пользователя',
    example: {
      type: 'passport',
      series: '1234',
      number: '567890',
      snils: '123-456-789 00'
    },
    required: false
  })
  @Column({ type: 'json', nullable: true })
  document: {
    type: string;
    series: string;
    number: string;
    snils: string;
  };

  @ApiProperty({ 
    description: 'Записи пользователя на прием',
    type: () => [Appointment]
  })
  @OneToMany(() => Appointment, appointment => appointment.user)
  appointments: Appointment[];

  @ApiProperty({ 
    description: 'Статус активности пользователя',
    example: true,
    default: true
  })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ 
    description: 'Дата создания учетной записи',
    example: '2024-01-20T10:00:00.000Z'
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true, unique: true })
  esiaId: string;
}

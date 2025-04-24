import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Notification {
  @ApiProperty({ 
    description: 'ID уведомления',
    example: 1,
    type: Number
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ 
    description: 'Информация о пользователе',
    example: {
      "id": 1,
      "name": "Петров Петр",
      "email": "petrov@example.com"
    }
  })
  @ManyToOne(() => User)
  user: User;

  @ApiProperty({ 
    description: 'Заголовок уведомления',
    example: 'Подтверждение записи',
    type: String
  })
  @Column()
  title: string;

  @ApiProperty({ 
    description: 'Текст уведомления',
    example: 'Ваша запись на прием подтверждена',
    type: String
  })
  @Column()
  message: string;

  @ApiProperty({ 
    description: 'Тип уведомления',
    enum: ['appointment_created', 'appointment_updated', 'appointment_cancelled', 'reminder'],
    example: 'appointment_created',
    type: String
  })
  @Column({
    type: 'enum',
    enum: ['appointment_created', 'appointment_updated', 'appointment_cancelled', 'reminder']
  })
  type: string;

  @ApiProperty({ 
    description: 'Статус прочтения',
    example: false,
    type: Boolean
  })
  @Column({ default: false })
  isRead: boolean;

  @ApiProperty({ 
    description: 'Дата создания',
    example: '2024-01-20T10:00:00.000Z',
    type: Date
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ 
    description: 'Дополнительные метаданные',
    example: {
      "appointmentId": 1,
      "appointmentTime": "2024-01-20T10:00:00.000Z",
      "employeeName": "Иванов Иван Иванович"
    },
    required: false
  })
  @Column({ type: 'jsonb', nullable: true })
  metadata: any;
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ServiceDirection } from '../../services/entities/serviceDirection.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Appointment {
  @ApiProperty({ 
    description: 'ID записи',
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
    description: 'Направление услуги',
    example: {
      "id": 1,
      "name": "Социальная поддержка",
      "description": "Услуги социальной поддержки населения"
    }
  })
  @ManyToOne(() => ServiceDirection)
  direction: ServiceDirection;

  @ApiProperty({ 
    description: 'Информация о специалисте',
    example: {
      "id": 1,
      "name": "Иванов Иван Иванович",
      "position": "Специалист отдела социальной поддержки"
    }
  })
  @ManyToOne(() => Employee)
  employee: Employee;

  @ApiProperty({ 
    description: 'Время начала записи',
    example: '2024-01-20T10:00:00.000Z',
    type: Date
  })
  @Column({ type: 'timestamp' })
  startTime: Date;

  @ApiProperty({ 
    description: 'Время окончания записи',
    example: '2024-01-20T11:00:00.000Z',
    type: Date
  })
  @Column({ type: 'timestamp' })
  endTime: Date;

  @ApiProperty({ 
    description: 'Длительность записи в минутах',
    example: 60,
    type: Number
  })
  @Column({ type: 'int' })
  duration: number;

  @ApiProperty({
    description: 'Статус записи',
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no_show'],
    example: 'pending'
  })
  @Column({
    type: 'enum',
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no_show'],
    default: 'pending'
  })
  status: string;

  @ApiProperty({
    description: 'Отметка о посещении',
    example: false,
    type: Boolean
  })
  @Column({ default: false })
  isVisited: boolean;

  @ApiProperty({
    description: 'Дата создания записи',
    example: '2024-01-19T15:00:00.000Z',
    type: Date
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Пользователь, создавший запись',
    nullable: true
  })
  @ManyToOne(() => User, { nullable: true })
  createdBy: User;

  @ApiProperty({
    description: 'Дополнительная информация',
    example: {
      "comments": "Нужна консультация по льготам",
      "documents": ["паспорт", "СНИЛС"]
    },
    nullable: true
  })
  @Column({ type: 'jsonb', nullable: true })
  additionalInfo: any;

  @ApiProperty({ 
    description: 'Полное имя специалиста',
    example: 'Иванов И.И.'
  })
  get specialistFullName(): string {
    return `${this.employee.lastName} ${this.employee.firstName.charAt(0)}.${this.employee.middleName?.charAt(0) || ''}.`;
  }

  @ApiProperty({ 
    description: 'Время в формате ЧЧ:ММ',
    example: '12:00'
  })
  get formattedTime(): string {
    return this.startTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  }

  @ApiProperty({ 
    description: 'Дата в формате ДД.ММ.YYYY',
    example: '15.05.2024'
  })
  get formattedDate(): string {
    return this.startTime.toLocaleDateString('ru-RU');
  }
}

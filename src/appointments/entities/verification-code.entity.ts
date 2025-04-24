import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class VerificationCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @Column()
  code: string;

  @Column()
  appointmentData: string; // JSON строка с данными записи

  @Column({ default: false })
  isUsed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 300 }) // 5 минут в секундах
  expiresIn: number;
}
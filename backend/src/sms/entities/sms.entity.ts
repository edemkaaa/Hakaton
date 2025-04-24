import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('sms')
export class SmsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    message: string;

    @Column({ default: false })
    sent: boolean;

    @CreateDateColumn()
    createdAt: Date;
}
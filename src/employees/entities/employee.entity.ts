import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Service } from '../../services/entities/service.entity';
import { User } from '../../users/entities/user.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  position: string;

  @Column({ nullable: true })
  photo: string;

  @ManyToMany(() => Service, service => service.employees)
  services: Service[];

  @Column({ type: 'json' })
  workSchedule: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    breakStart?: string;
    breakEnd?: string;
  }[];

  @OneToMany(() => Appointment, appointment => appointment.employee)
  appointments: Appointment[];

  @Column({ default: true })
  isActive: boolean;
}
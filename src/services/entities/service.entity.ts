import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { ServiceDirection } from './serviceDirection.entity';
import { Employee } from '../../employees/entities/employee.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  duration: number; // в минутах

  @ManyToOne(() => ServiceDirection, direction => direction.services)
  direction: ServiceDirection;

  @ManyToMany(() => Employee)
  @JoinTable()
  employees: Employee[];

  @Column({ type: 'jsonb' })
  workingHours: {
    monday: { start: string; end: string };
    tuesday: { start: string; end: string };
    wednesday: { start: string; end: string };
    thursday: { start: string; end: string };
    friday: { start: string; end: string };
  };

  @Column({ default: true })
  isActive: boolean;
}

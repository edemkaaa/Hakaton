import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Service } from '../../services/entities/service.entity';
import { User } from '../../users/entities/user.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column()
  position: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  photo: string;

  @ManyToMany(() => Service)  
  @JoinTable({
    name: 'employee_services',  
    joinColumn: { 
      name: 'employee_id',  
      referencedColumnName: 'id'  
    },
    inverseJoinColumn: { 
      name: 'service_id', 
      referencedColumnName: 'id'  
    },
  })
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

  @OneToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id', nullable: true })
  userId: number;
}

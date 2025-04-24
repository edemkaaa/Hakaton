import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { ServiceDirection } from './serviceDirection.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { Subservice } from './subservice.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('services')  // явно указываем имя таблицы
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  duration: number;

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
  isActive: boolean = true;

  @ApiProperty({
    description: 'Подуслуги',
    type: () => [Subservice]
  })
  @OneToMany(() => Subservice, subservice => subservice.service)
  subservices: Subservice[];

  @ApiProperty({
    description: 'Количество доступных подуслуг',
    example: 3
  })
  get subservicesCount(): number {
    return this.subservices?.filter(s => s.isActive).length || 0;
  }
}

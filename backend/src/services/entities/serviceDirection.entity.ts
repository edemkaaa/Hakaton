import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Service } from './service.entity';

@Entity()
export class ServiceDirection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Service, service => service.direction)
  services: Service[];
}
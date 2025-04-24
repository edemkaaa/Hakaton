import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Service } from './service.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('subservices')
export class Subservice {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Название подуслуги',
    example: 'Оформление документов на земельный участок'
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Описание подуслуги',
    example: 'Помощь в оформлении и подготовке документов'
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    description: 'Длительность подуслуги в минутах',
    example: 30
  })
  @Column()
  duration: number;

  @ManyToOne(() => Service, service => service.subservices)
  service: Service;

  @Column({ default: true })
  isActive: boolean;
}
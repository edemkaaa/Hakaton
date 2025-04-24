import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>
  ) {}

  async findAll(): Promise<Service[]> {
    return this.serviceRepository.find();
  }

  async findOne(id: number): Promise<Service | undefined> {
    const service = await this.serviceRepository.findOne({
      where: { id }
    });
    return service || undefined;
  }

  async create(serviceData: Partial<Service>): Promise<Service> {
    const service = this.serviceRepository.create(serviceData);
    return this.serviceRepository.save(service);
  }

  async update(id: number, serviceData: Partial<Service>): Promise<Service | undefined> {
    await this.serviceRepository.update(id, serviceData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.serviceRepository.delete(id);
  }
}
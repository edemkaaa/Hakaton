import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { Subservice } from './entities/subservice.entity';
import { CreateSubserviceDto } from './dto/create-subservice.dto';
import { UpdateSubserviceDto } from './dto/update-subservice.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(Subservice)
    private subserviceRepository: Repository<Subservice>
  ) {}

  async findAll(): Promise<Service[]> {
    return this.serviceRepository.find({
      relations: ['subservices'],
      where: { isActive: true },
    });
  }

  async findOne(id: number): Promise<Service | undefined> {
    return this.serviceRepository.findOne({
      where: { id },
      relations: ['subservices'],
    });
  }

  async findSubservice(id: number): Promise<Subservice> {
    return this.subserviceRepository.findOne({
      where: { id },
      relations: ['service'],
    });
  }

  async getSubservices(serviceId: number): Promise<Subservice[]> {
    return this.subserviceRepository.find({
      where: { service: { id: serviceId }, isActive: true },
    });
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

  async createSubservice(
    serviceId: number,
    createSubserviceDto: CreateSubserviceDto
  ): Promise<Subservice> {
    const service = await this.serviceRepository.findOne({
      where: { id: serviceId },
    });

    if (!service) {
      throw new NotFoundException(`Услуга с ID ${serviceId} не найдена`);
    }

    const subservice = this.subserviceRepository.create({
      ...createSubserviceDto,
      service,
    });

    return this.subserviceRepository.save(subservice);
  }

  async updateSubservice(
    id: number,
    updateSubserviceDto: UpdateSubserviceDto
  ): Promise<Subservice> {
    const subservice = await this.findSubservice(id);
    
    if (!subservice) {
      throw new NotFoundException(`Подуслуга с ID ${id} не найдена`);
    }

    Object.assign(subservice, updateSubserviceDto);
    return this.subserviceRepository.save(subservice);
  }

  async removeSubservice(id: number): Promise<void> {
    const result = await this.subserviceRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Подуслуга с ID ${id} не найдена`);
    }
  }
}

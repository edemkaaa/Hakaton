import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationRepository.create(createNotificationDto);
    return this.notificationRepository.save(notification);
  }

  async findAllForUser(userId: number): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(id: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id },
    });
    
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    
    notification.isRead = true;
    return this.notificationRepository.save(notification);
  }

  async createAppointmentNotification(
    userId: number,
    appointmentId: number,
    type: string,
    additionalInfo?: any,
  ): Promise<Notification> {
    const messages = {
      appointment_created: 'Ваша запись успешно создана',
      appointment_updated: 'Информация о записи обновлена',
      appointment_cancelled: 'Запись отменена',
      reminder: 'Напоминание о предстоящей записи',
    };

    const notification = new CreateNotificationDto();
    notification.userId = userId;
    notification.type = type;
    notification.title = 'Информация о записи';
    notification.message = messages[type];
    notification.metadata = {
      appointmentId,
      ...additionalInfo,
    };

    return this.create(notification);
  }
}
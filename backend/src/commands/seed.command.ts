import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { SeederService } from '../database/seeder.service';

@Injectable()
export class SeedCommand extends Command<void> {
  constructor() {
    super();
  }
}

@Injectable()
@CommandHandler(SeedCommand)
export class SeedCommandHandler implements ICommandHandler<SeedCommand> {
  constructor(private readonly seederService: SeederService) {}

  async execute(): Promise<void> {
    try {
      await this.seederService.seed();
      console.log('Database seeding completed successfully');
    } catch (error) {
      console.error('Database seeding failed:', error);
      throw error;
    }
  }
}

import { NestFactory } from '@nestjs/core';
import { CommandBus } from '@nestjs/cqrs';
import { AppModule } from './app.module';
import { SeedCommand } from './commands/seed.command';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });

  try {
    const commandBus = app.get(CommandBus);
    await commandBus.execute(new SeedCommand());
    await app.close();
  } catch (error) {
    console.error(error);
    await app.close();
    process.exit(1);
  }
}

bootstrap();

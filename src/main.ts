import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaNotFoundExceptionFilter } from './exception-filters/prisma-not-found-exception-filter';
import { ValidationPipe } from '@nestjs/common';
import { RabbitMq } from './rabbitMq';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const rabbitMq = new RabbitMq()

  app.enableShutdownHooks();

  app.useGlobalFilters(new PrismaNotFoundExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();

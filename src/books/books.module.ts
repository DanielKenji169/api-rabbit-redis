import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaService } from 'src/prisma.service';
import { BooksRepository } from './books.repository';
import { RabbitMq } from 'src/rabbitMq';

@Module({
  controllers: [BooksController],
  providers: [BooksService,PrismaService,BooksRepository,RabbitMq],
})
export class BooksModule {}

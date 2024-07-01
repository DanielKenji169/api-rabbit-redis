import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { BooksService } from 'src/books/books.service';
import { BooksRepository } from 'src/books/books.repository';
import { RabbitMq } from 'src/rabbitMq';

@Module({
  controllers: [UsersController],
  providers: [UsersService,PrismaService,BooksService,BooksRepository,RabbitMq],
})
export class UsersModule {}

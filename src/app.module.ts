import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BooksModule, UsersModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}

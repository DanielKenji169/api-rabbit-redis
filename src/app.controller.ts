import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('app')
export class AppController {
  constructor(
    private prisma: PrismaService) {}

  @Get('teste')
  async getHello() {
    const book = await this.prisma.books.create({
      data:{
        title: 'Harry Potter',
        genre:'Fantasy',
        author:'jéssica'
      }
    })

    return{
      book
    }
  }
}

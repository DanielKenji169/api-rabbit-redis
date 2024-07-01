import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query } from 'express-serve-static-core';
import { RabbitMq } from 'src/rabbitMq';

@Injectable()
export class BooksRepository {
  constructor(private readonly prisma: PrismaService,
              private rabbitMq:RabbitMq) {}

  async createBook(createBookDto: CreateBookDto) {
    return this.prisma.books.create({
      data: createBookDto,
    });
  }

  async createBookRabbit(createBookDto: CreateBookDto){
    await this.rabbitMq.connect();
    await this.rabbitMq.sendMessage(createBookDto)
  }

  async readBookRabbit(){
    await this.rabbitMq.readMessage();
  }

  async findAll(page: number, pageSize:number, searchTerm?: string) {
    
    let where ={};

    if(searchTerm){
      where = {
        OR: [
          {title: {contains: searchTerm}},
          {author: {contains: searchTerm}},
          {genre: {contains: searchTerm}},
        ],
      };
    }

    if (page == null || pageSize == null) {
      return this.prisma.books.findMany({
        where: where
      });
    }

    const skip = pageSize * (page - 1)
    const take =parseInt(pageSize.toString(), 10);
    
    return this.prisma.books.findMany({
      take: take,
      skip: skip,
      where: where,
    })
    ;
  }

  findOne(id: number) {
    return this.prisma.books.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
  
  findByTitle(title: string){
    return this.prisma.books.findMany({
      where: {
        title
      },
    });
  }

  findByGenre(genre: string){
    return this.prisma.books.findMany({
      where: {
        genre
      },
    });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.prisma.books.update({
      where:{
        id,
      },
      data: updateBookDto,
    });
  }

  addRent(id: number) {
    return this.prisma.books.update({
      where:{
        id,
      },
      data:{
        rented:true
      },
    });
    }

  removeRent(id: number) {
    return this.prisma.books.update({
      where:{
        id,
      },
      data:{
        rented:false
      },
    });  
  }

  remove(id: number) {
    return this.prisma.books.delete({
      where:{
        id,
      },
    });
  }

  async sell(id: number, bookId:number){
    const book = await this.prisma.books.findUnique({
      where: {
        id,
      },
      select: {
        forSale: true,
      },
     });
     if(book && book.forSale){
        await this.prisma.books.update({
          where:{
            id,
          },
          data:{
            availabe:false,
            forRent:false,
            forSale:false,
            client: { connect: { id: bookId } },
          },
        });return 'Book sold.';
        } else {
        return 'The book is not for sale. Or has not been found.'
                }
    }

    async rents(id: number, bookId:number, rentedDays : number){
        const book = await this.prisma.books.findUnique({
          where: {
            id,
          },
          select: {
            forRent: true,
          },
        });
        
        if(book && book.forRent){
          await this.prisma.books.update({
            where:{
              id,
            },
            data:{
              forRent:false,
              forSale:false,
              rented:true,
              client: { connect: { id: bookId } },
              rentedDays: rentedDays
            },
          });return 'Book rented.';
        } else {
          return 'The book is not available for rent. Or has not been found.'
        }
      }

    async getForSaleStatus(id: number):Promise<boolean>{
        const book = await this.prisma.books.findUnique({
          where: {
            id,
          },
          select: {
            forSale: true,
          },
        });
    
        return book?.forSale ?? false
      }  

      async getForRentStatus(id: number):Promise<boolean>{
        const book = await this.prisma.books.findUnique({
          where: {
            id,
          },
          select: {
            forRent: true,
          },
        });
    
        return book?.forRent ?? false
      }  
}

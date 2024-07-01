import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma.service';
import { BooksRepository } from './books.repository';
import { Query } from 'express-serve-static-core';


@Injectable()
export class BooksService {
 constructor(private readonly booksRepository: BooksRepository){}
  
  async create(createBookDto: CreateBookDto) {
    return this.booksRepository.createBook(createBookDto);
      
    
  }

  async findAll(page: number, pageSize: number, searchTerm?: string ) {
    const books = await this.booksRepository.findAll(page,pageSize,searchTerm)
    return books
  }

  findOne(id: number) {
    return this.booksRepository.findOne(id)
  }

  findByTitle(title: string){
    return this.booksRepository.findByTitle(title)
  }

  findByGenre(genre: string){
    return this.booksRepository.findByGenre(genre)
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.booksRepository.update(id,updateBookDto)
  }

  addRent(id: number) {
    return this.booksRepository.addRent(id)
    }

  removeRent(id: number) {
    return this.booksRepository.removeRent(id)    
  }

  remove(id: number) {
    return this.booksRepository.remove(id)
  }

  async sell(id: number, bookId:number){
    return this.booksRepository.sell(id,bookId)
  }

  async rents(id: number, bookId:number, rentedDays : number){
    return this.booksRepository.rents(id,bookId,rentedDays)
  }

  async getForSaleStatus(id: number):Promise<boolean>{
    return this.booksRepository.getForSaleStatus(id)
  }

  async getForRentStatus(id: number):Promise<boolean>{
    return this.booksRepository.getForRentStatus(id)
  }

  async testRabbit(createBookDto: CreateBookDto){
    await this.booksRepository.createBookRabbit(createBookDto);
    await this.booksRepository.readBookRabbit();
  }

}


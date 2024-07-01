import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    
    return this.booksService.create(createBookDto);

  }
  @Post('rabbit')
  async testRabbit(@Body() createBookDto: CreateBookDto) {
    
    return this.booksService.testRabbit(createBookDto);
  }
  @Get()
  async findAll(  @Query('page') page?: number,
                  @Query('pageSize') pageSize?: number,
                  @Query('searchTerm') searchTerm?: string,) {
   
                    return this.booksService.findAll(page,pageSize, searchTerm);
   
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.booksService.findOne(+id);
  }

  @Get('title/:title')
  findByTitle(@Param('title') title: string) {
    return this.booksService.findByTitle(title);
  }

  @Get('genre/:genre')
  findByGenre(@Param('genre') genre: string) {
    return this.booksService.findByGenre(genre);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto) 
    {
    return this.booksService.update(id, updateBookDto);
    }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.booksService.remove(+id);
  }

  @Patch('sell/:id/:userId')
  async sell(
    @Param('id', new ParseIntPipe) id : number,
    @Param('userId', new ParseIntPipe) userId :number,
    ) {
    
    const result = this.booksService.sell(id, userId);

    return result
   
      
  }

  @Patch('rents/:id/:userId')
  async rents(
    @Param('id', new ParseIntPipe) id : number,
    @Param('userId', new ParseIntPipe) userId :number,
    @Body() UpdateBookDto: UpdateBookDto
  ){
    const result = await this.booksService.rents(id,userId,UpdateBookDto.rentedDays)
    return result
  }

  
}

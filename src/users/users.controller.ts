import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BooksService } from 'src/books/books.service';
import { Inject } from '@nestjs/common';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    @Inject
    (BooksService) private readonly booksService: BooksService,
  ) {} 
  
  

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  /*@Patch('rent/:id/:bookId')
  async rent(
    @Param('id', new ParseIntPipe) id:number,
    @Param('bookId', new ParseIntPipe) bookId: number)
    {
      return this.usersService.rent(id, bookId)
  }


  
  @Patch('rent/:userId/:bookId')
  async connectBookToUser(
    @Param('userId', new ParseIntPipe) userId: number,
    @Param('bookId', new ParseIntPipe) bookId: number,
    @Body() UpdateBookDto: UpdateBookDto
    
  ) {
    
      await this.usersService.connectBooktoUser(userId, bookId);
      await this.booksService.addRent(bookId);
      await this.booksService.rent(bookId,true,UpdateBookDto);
      
      return { message: 'Book rented to user.' };
    } 
      
    @Patch('disconnect/:userId/:bookId')
    async disconnectBookToUser(
      @Param('userId', new ParseIntPipe) userId: number,
      @Param('bookId', new ParseIntPipe) bookId: number,
    ) {
      
        await this.usersService.connectBooktoUser(userId, bookId);
        await this.booksService.removeRent(bookId);
        
        return { message: 'User returned the book.' };
    }
*/
    }
  



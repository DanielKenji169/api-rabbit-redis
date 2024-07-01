import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { Books } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService){}

  create(createUserDto: CreateUserDto) {
    return this.prisma.client.create({
      data:createUserDto,
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async rent(id: number, bookId :number){
    
    const book = await this.prisma.books.findUnique({where : {id: bookId}})

    return this.prisma.client.update({
      where:{
        id,
      },
      data: book,
    });

  } 

  async connectBooktoUser(userId: number, bookId:number): Promise<void>{
  
  const user = await this.prisma.client.findUnique({ where: { id: userId } });
  const book = await this.prisma.books.findUnique({ where: { id: bookId } });
  
  await this.prisma.client.update({
    where: { id: userId },
    data: { books: { connect: { id: bookId } } },
  });
  }

  async disconnectBookFromUser(userId: number, bookId: number): Promise<void> {
    const user = await this.prisma.client.findUnique({ where: { id: userId } });
    const book = await this.prisma.books.findUnique({ where: { id: bookId } });
  
    if (!user || !book) {
      throw new Error('User or book not found.');
    }
  
    // Desconecta o livro do usuário
    await this.prisma.client.update({
      where: { id: userId },
      data: {
        books: { disconnect: { id: bookId } },
      },
    });
  }
}

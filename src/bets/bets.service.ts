import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateBetDto } from './dto/create-bet.dto';

@Injectable()
export class BetsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(@Body() createBetDto: CreateBetDto) {
    /*     await this.prisma.bet.create({
      data: createBetDto,
    }); */
    return Promise.resolve({ message: 'Bet created succesfully!' });
  }

  async findAll() {
    return this.prisma.bet.findMany();
  }

  findOne(id: number) {
    return this.prisma.bet.findUnique({
      where: { id },
    });
  }

  async remove(id: number) {
    const userExistsValidation = await this.findOne(id);
    if (!userExistsValidation) {
      throw new Error('User doesnt exist on database.');
    }
    await this.prisma.bet.delete({
      where: { id },
    });
    return Promise.resolve({ message: 'Bet deleted succesfully!' });
  }
}

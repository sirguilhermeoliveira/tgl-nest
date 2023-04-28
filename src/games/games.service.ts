import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(@Body() createGameDto: CreateGameDto) {
    await this.prisma.game.create({
      data: createGameDto,
    });
    return Promise.resolve({ message: 'Game created succesfully!' });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }
  async remove(id: number) {
    await this.prisma.user.delete({
      where: { id },
    });
    return Promise.resolve({ message: 'Game deleted succesfully!' });
  }
}

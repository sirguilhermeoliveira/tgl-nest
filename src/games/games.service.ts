import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(@Body() createGameDto: CreateGameDto) {
    try {
      await this.prisma.game.create({
        data: createGameDto,
      });

      return { message: 'Game created successfully!' };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  findAll(page?: number, pageSize?: number) {
    if (!page || isNaN(page)) {
      page = 1;
    }
    if (!pageSize || isNaN(pageSize)) {
      pageSize = 10;
    }
    const skip = (page - 1) * pageSize;
    return this.prisma.game.findMany({
      skip: skip,
      take: pageSize,
    });
  }
  async remove(id: number) {
    try {
      await this.prisma.game.delete({
        where: { id },
      });

      return { message: 'Game deleted successfully!' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

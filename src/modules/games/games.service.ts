import { Body, Injectable, Logger } from '@nestjs/common';
import { nanoid } from 'nanoid';

import { PrismaService } from '../../modules/prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GamesService {
  private readonly logger = new Logger(GamesService.name);

  constructor(private readonly prisma: PrismaService) {}
  async create(@Body() createGameDto: CreateGameDto) {
    try {
      await this.prisma.game.create({
        data: { ...createGameDto, id: nanoid() },
      });

      return { message: 'Game created successfully!' };
    } catch (error) {
      this.logger.error(`Error during create a game: ${error.message}`);
      throw new Error(error.message);
    }
  }

  findAll(page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize;
    return this.prisma.game.findMany({
      skip: skip,
      take: pageSize,
    });
  }
  async remove(id: string) {
    try {
      await this.prisma.game.delete({
        where: { id },
      });

      return { message: 'Game deleted successfully!' };
    } catch (error) {
      this.logger.error(`Error during delete a bet: ${error.message}`);
      throw new Error(error.message);
    }
  }
}

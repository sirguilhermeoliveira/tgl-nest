import { Body, Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { nanoid } from 'nanoid';

import { PrismaService } from '../../modules/prisma/prisma.service';
import { CreateBetDto } from './dto/create-bet.dto';

@Injectable()
export class BetsService {
  private readonly logger = new Logger(BetsService.name);

  constructor(private readonly prisma: PrismaService) {}
  async create(@Body() createBetDto: CreateBetDto, user) {
    try {
      if (user.id !== createBetDto.user_id) {
        throw new Error('Cant bet on a user that isnt yours.');
      }
      const betData = {
        ...createBetDto,
        id: nanoid(),
        bet_numbers: createBetDto.bet_numbers.toString(),
      };

      await this.prisma.bet.create({
        data: betData,
      });
      return Promise.resolve({ message: 'Bet created successfully!' });
    } catch (error) {
      this.logger.error(`Error during create bet: ${error.message}`);
      throw new Error(error.message);
    }
  }

  async findAllBets() {
    const bets = await this.prisma.bet.findMany();
    return bets.map((bet) => ({
      ...bet,
      bet_numbers: bet.bet_numbers.split(',').map(Number),
    }));
  }

  async findAllGameBets(gameId: string, userId: string) {
    const gameExists = await this.prisma.game.findUnique({ where: { id: gameId } });
    if (!gameExists) {
      throw new Error('Game not found');
    }

    const userExists = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      throw new Error('User not found');
    }

    const bets = await this.prisma.bet.findMany({
      where: { AND: [{ game_id: gameId }, { user_id: userId }] },
    });
    return bets.map((bet) => ({
      ...bet,
      bet_numbers: bet.bet_numbers.split(',').map(Number),
    }));
  }

  async findAllMyBets(user: User, gameId?: string, page = 1, pageSize = 10) {
    const userExists = await this.prisma.user.findUnique({ where: { id: user.id } });
    if (!userExists) {
      throw new Error('User not found');
    }
    const skip = (page - 1) * pageSize;
    const whereClause = gameId ? { user_id: user.id, game_id: gameId } : { user_id: user.id };
    const bets = await this.prisma.bet.findMany({
      where: whereClause,
      skip: skip,
      take: pageSize,
    });
    return bets.map((bet) => ({
      ...bet,
      bet_numbers: bet.bet_numbers.split(',').map(Number),
    }));
  }
  async findAllUserBets(userId: string) {
    const userExists = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      throw new Error('User not found');
    }

    const bets = await this.prisma.bet.findMany({
      where: { user_id: userId },
    });
    return bets.map((bet) => ({
      ...bet,
      bet_numbers: bet.bet_numbers.split(',').map(Number),
    }));
  }

  findOne(id: string) {
    return this.prisma.bet.findUnique({
      where: { id },
    });
  }

  async remove(id: string) {
    try {
      const userExistsValidation = await this.findOne(id);
      if (!userExistsValidation) {
        throw new Error('User does not exist in the database.');
      }
      await this.prisma.bet.delete({
        where: { id },
      });
      return Promise.resolve({ message: 'Bet deleted successfully!' });
    } catch (error) {
      this.logger.error(`Error during deleting a bet: ${error.message}`);
      throw new Error(error.message);
    }
  }
}

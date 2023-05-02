import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateBetDto } from './dto/create-bet.dto';

@Injectable()
export class BetsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(@Body() createBetDto: CreateBetDto, user) {
    try {
      if (user.id !== createBetDto.user_id) {
        throw new Error('Cant bet on a user that isnt yours.');
      }
      const betData = {
        ...createBetDto,
        bet_numbers: createBetDto.bet_numbers.toString(),
      };

      await this.prisma.bet.create({
        data: betData,
      });
      return Promise.resolve({ message: 'Bet created succesfully!' });
    } catch (error) {
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

  async findAllGameBets(gameId: number, userId: number) {
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

  async findAllUserBets(userId: number) {
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

  findOne(id: number) {
    return this.prisma.bet.findUnique({
      where: { id },
    });
  }

  async remove(id: number) {
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
      throw new Error(error.message);
    }
  }
}

import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateBetDto } from './dto/create-bet.dto';

@Injectable()
export class BetsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(@Body() createBetDto: CreateBetDto, user) {
    console.log(user.id);
    console.log(createBetDto.user_id);
    return;
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
  }

  async findAllBets() {
    return this.prisma.bet.findMany();
  }

  async findAllGameBets(game_id: number, user_id: number) {
    const bets = await this.prisma.bet.findMany({
      where: { AND: [{ game_id: game_id }, { user_id: user_id }] },
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

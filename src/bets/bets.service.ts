import { Injectable } from '@nestjs/common';

import { CreateBetDto } from './dto/create-bet.dto';

@Injectable()
export class BetsService {
  create(createBetDto: CreateBetDto) {
    return 'This action adds a new bet';
  }

  findAll() {
    return `This action returns all bets`;
  }

  remove(id: number) {
    return `This action removes a #${id} bet`;
  }
}

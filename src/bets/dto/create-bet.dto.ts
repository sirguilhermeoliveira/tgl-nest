import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

import { Bet } from '../entities/bet.entity';

export class CreateBetDto extends Bet {
  @ApiProperty({
    example: '80',
    description: `Bets limit range you can choose on a bet.`,
  })
  @IsArray()
  bet_numbers: Array<number>;
}

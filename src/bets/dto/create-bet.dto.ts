import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

import { Bet } from '../entities/bet.entity';

export class CreateBetDto extends Bet {
  @ApiProperty({
    example: '80',
    description: `Bets limit range you can choose on a bet.`,
  })
  @IsNumber()
  bet_numbers: number;
}

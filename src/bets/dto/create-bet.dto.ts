import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

import { Bet } from '../entities/bet.entity';

export class CreateBetDto extends Bet {
  @ApiProperty({
    example: '80',
    description: `Bets limit range you can choose on a bet.`,
  })
  @IsString()
  bet_numbers: string;

  @ApiProperty({
    example: '1',
    description: `Own user id.`,
  })
  @IsNumber()
  user_id: number;

  @ApiProperty({
    example: '1',
    description: `Choose game id.`,
  })
  @IsNumber()
  game_id: number;
}

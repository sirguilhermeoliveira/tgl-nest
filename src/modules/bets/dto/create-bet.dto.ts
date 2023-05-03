import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateBetDto {
  @ApiProperty({
    example: '80',
    description: `Bets limit range you can choose on a bet.`,
  })
  @IsNumber({}, { each: true })
  bet_numbers: number[] | string;

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

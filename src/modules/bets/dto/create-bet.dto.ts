import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

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
  @IsString()
  user_id: string;

  @ApiProperty({
    example: '1',
    description: `Choose game id.`,
  })
  @IsString()
  game_id: string;
}

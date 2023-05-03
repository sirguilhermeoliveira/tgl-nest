import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({
    example: 'Mega Sena',
    description: `Game title.`,
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Lorem ipsilum, lorem ipsilum, lorem ipsilum',
    description: `Game description.`,
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: '#000',
    description: `Game color.`,
  })
  @IsString()
  color: string;

  @ApiProperty({
    example: '3.2',
    description: `Price of each game.`,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: '6',
    description: `Number of numbers you can choose on a bet.`,
  })
  @IsNumber()
  max_bet_numbers: number;

  @ApiProperty({
    example: '80',
    description: `Bets limit range you can choose on a bet.`,
  })
  @IsNumber()
  bet_range: number;
}

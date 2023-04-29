import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IsAdmin } from 'src/auth/decorators/is-admin.decorator';
import { User } from 'src/users/entities/user.entity';

import { BetsService } from './bets.service';
import { CreateBetDto } from './dto/create-bet.dto';

@Controller('bets')
@ApiTags('bets')
export class BetsController {
  constructor(private readonly betsService: BetsService) {}

  @Post()
  create(@Body() createBetDto: CreateBetDto, @CurrentUser() user: User) {
    return this.betsService.create(createBetDto, user);
  }

  @IsAdmin()
  @Get()
  findAllBets() {
    return this.betsService.findAllBets();
  }

  @IsAdmin()
  @Get(':game_id/:user_id')
  findAllGameBets(@Param('game_id') game_id: string, @Param('user_id') user_id: string) {
    return this.betsService.findAllGameBets(+game_id, +user_id);
  }

  @IsAdmin()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.betsService.remove(+id);
  }
}

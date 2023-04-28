import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { IsAdmin } from 'src/auth/decorators/is-admin.decorator';

import { CreateGameDto } from './dto/create-game.dto';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @IsAdmin()
  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @IsAdmin()
  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @IsAdmin()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(+id);
  }
}

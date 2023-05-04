import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IsAdmin } from '../../modules/auth/decorators/is-admin.decorator';
import { PaginationParams } from '../../shared/dto/pagination-params.dto';
import { CreateGameDto } from './dto/create-game.dto';
import { GamesService } from './games.service';

@Controller('games')
@ApiTags('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @IsAdmin()
  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @IsAdmin()
  @Get()
  findAll(@Query() params: PaginationParams) {
    return this.gamesService.findAll(params.page, params.pageSize);
  }

  @IsAdmin()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(+id);
  }
}

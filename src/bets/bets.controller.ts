import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { IsAdmin } from 'src/auth/decorators/is-admin.decorator';

import { BetsService } from './bets.service';
import { CreateBetDto } from './dto/create-bet.dto';

@Controller('bets')
export class BetsController {
  constructor(private readonly betsService: BetsService) {}

  @Post()
  create(@Body() createBetDto: CreateBetDto) {
    return this.betsService.create(createBetDto);
  }

  @IsAdmin()
  @Get()
  findAll() {
    return this.betsService.findAll();
  }

  @IsAdmin()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.betsService.remove(+id);
  }
}

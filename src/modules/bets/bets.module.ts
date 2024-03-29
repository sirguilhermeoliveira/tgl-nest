import { Module } from '@nestjs/common';

import { PrismaModule } from '../../modules/prisma/prisma.module';
import { BetsController } from './bets.controller';
import { BetsService } from './bets.service';

@Module({
  imports: [PrismaModule],
  controllers: [BetsController],
  providers: [BetsService],
})
export class BetsModule {}

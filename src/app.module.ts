import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { BetsModule } from './bets/bets.module';
import { GamesModule } from './games/games.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, GamesModule, BetsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

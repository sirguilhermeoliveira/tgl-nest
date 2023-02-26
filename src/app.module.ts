import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'users/entities/user.entity';

import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'muitocurta123',
      database: 'tgl_nest',
      entities: [User],
      autoLoadEntities: true,
      synchronize: true, // cant be used in production otherwise you can lose data.
    }),
  ],
})
export class AppModule {}

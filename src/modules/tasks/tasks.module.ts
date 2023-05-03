import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}

import { Controller } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Cron('0 0 9 * * *')
  handleDailyTask() {
    return this.tasksService.handleDailyTask();
  }
}

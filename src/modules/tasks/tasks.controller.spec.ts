import { Test, TestingModule } from '@nestjs/testing';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            handleDailyTask: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  describe('handleDailyTask', () => {
    it('should call tasksService.handleDailyTask once', () => {
      const handleDailyTaskSpy = jest.spyOn(tasksService, 'handleDailyTask');
      controller.handleDailyTask();
      expect(handleDailyTaskSpy).toHaveBeenCalledTimes(1);
    });
  });
});

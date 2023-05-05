import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';

import { betsOlderthanOneWeekMock } from '../../mocks/bets.mocks';
import { usersMock } from '../../mocks/users.mocks';
import { PrismaService } from '../prisma/prisma.service';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let tasksService: TasksService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        PrismaService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    tasksService = moduleRef.get<TasksService>(TasksService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleDailyTask', () => {
    it('should send email to users with bets older than one week', async () => {
      jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(usersMock);

      jest.spyOn(prismaService.bet, 'findMany').mockImplementation((params): any => {
        const filteredBets = betsOlderthanOneWeekMock.filter(
          (bet) => bet.user_id === params.where.user_id,
        );
        return Promise.resolve(filteredBets);
      });

      const mailerService = {
        sendMail: jest.fn(),
      };

      tasksService = new TasksService(mailerService as any, prismaService);

      await tasksService.handleDailyTask();

      expect(mailerService.sendMail).toHaveBeenCalledTimes(2);
      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: 'user1@example.com',
        from: 'noreply@nestjs.com',
        subject: 'Come back to TGL Nest!',
        template: 'taskBets',
        context: {
          name: 'User 1',
        },
      });
      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: 'user2@example.com',
        from: 'noreply@nestjs.com',
        subject: 'Come back to TGL Nest!',
        template: 'taskBets',
        context: {
          name: 'User 2',
        },
      });
    });
  });
});

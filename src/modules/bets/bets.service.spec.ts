import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';

import { betMock_1 } from '../../mocks/bets.mocks';
import { userMock_1 } from '../../mocks/users.mocks';
import { PrismaService } from '../prisma/prisma.service';
import { BetsService } from './bets.service';

describe('BetsService', () => {
  let betsService: BetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        {
          provide: BetsService,
          useValue: {
            create: jest.fn().mockResolvedValue({ message: 'Bet created successfully!' }),
          },
        },
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    betsService = module.get<BetsService>(BetsService);
  });

  describe('Create', () => {
    it('should create a bet', async () => {
      jest.spyOn(betsService, 'create');
      const result = await betsService.create(betMock_1, userMock_1);
      expect(result).toEqual({ message: 'Bet created successfully!' });
    });
  });
});

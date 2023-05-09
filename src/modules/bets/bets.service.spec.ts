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
            findAllBets: jest.fn().mockResolvedValue(betMock_1),
            findAllGameBets: jest.fn().mockResolvedValue(betMock_1),
            findAllMyBets: jest.fn().mockResolvedValue(betMock_1),
            findAllUserBets: jest.fn().mockResolvedValue(betMock_1),
            findOne: jest.fn().mockResolvedValue(betMock_1),
            remove: jest.fn().mockResolvedValue({ message: 'Bet deleted successfully!' }),
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Create', () => {
    it('should create a bet', async () => {
      jest.spyOn(betsService, 'create');
      const result = await betsService.create(betMock_1, userMock_1);
      expect(result).toEqual({ message: 'Bet created successfully!' });
    });
  });

  describe('Find All Bets', () => {
    it('should find all bets', async () => {
      jest.spyOn(betsService, 'create');
      await betsService.create(betMock_1, userMock_1);
      jest.spyOn(betsService, 'findAllBets');
      const result = await betsService.findAllBets();
      expect(result).toEqual(betMock_1);
    });
  });

  describe('Find All Game Bets', () => {
    it('should find all game bets', async () => {
      jest.spyOn(betsService, 'create');
      await betsService.create(betMock_1, userMock_1);
      jest.spyOn(betsService, 'findAllGameBets');
      const result = await betsService.findAllGameBets('1', '2');
      expect(result).toEqual(betMock_1);
    });
  });

  describe('Find All My Bets', () => {
    it('should all my bets', async () => {
      jest.spyOn(betsService, 'create');
      await betsService.create(betMock_1, userMock_1);
      jest.spyOn(betsService, 'findAllMyBets');
      const result = await betsService.findAllMyBets(userMock_1);
      expect(result).toEqual(betMock_1);
    });
  });

  describe('Find All User Bets', () => {
    it('should find all user bets', async () => {
      jest.spyOn(betsService, 'findAllUserBets');
      const result = await betsService.findAllUserBets('1');
      expect(result).toEqual(betMock_1);
    });
  });

  describe('Find one bet', () => {
    it('should find one user bet', async () => {
      jest.spyOn(betsService, 'create');
      await betsService.create(betMock_1, userMock_1);
      jest.spyOn(betsService, 'findOne');
      const result = await betsService.findOne('1');
      expect(result).toEqual(betMock_1);
    });
  });

  describe('Find remove a bet', () => {
    it('should remove a bet', async () => {
      jest.spyOn(betsService, 'create');
      await betsService.create(betMock_1, userMock_1);
      jest.spyOn(betsService, 'remove');
      const result = await betsService.remove('1');
      expect(result).toEqual({ message: 'Bet deleted successfully!' });
    });
  });
});

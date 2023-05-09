import { Test, TestingModule } from '@nestjs/testing';

import { betMock_1 } from '../../mocks/bets.mocks';
import { userMock_1 } from '../../mocks/users.mocks';
import { BetsController } from './bets.controller';
import { BetsService } from './bets.service';

describe('BetsController', () => {
  let controller: BetsController;
  let betsService: BetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BetsController],
      providers: [
        {
          provide: BetsService,
          useValue: {
            create: jest.fn(),
            findAllMyBets: jest.fn(),
            findAllBets: jest.fn(),
            findAllGameBets: jest.fn(),
            findAllUserBets: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BetsController>(BetsController);
    betsService = module.get<BetsService>(BetsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Create', () => {
    it('should call betsService.create once', () => {
      const createBet = jest.spyOn(betsService, 'create');
      controller.create(betMock_1, userMock_1);
      expect(createBet).toHaveBeenCalledTimes(1);
    });
  });

  describe('FindAllMyBets', () => {
    it('should call betsService.findAllMyBets once', () => {
      const findAllMyBets = jest.spyOn(betsService, 'findAllMyBets');
      controller.findAllMyBets(userMock_1);
      expect(findAllMyBets).toHaveBeenCalledTimes(1);
    });
  });

  describe('FindAllBets', () => {
    it('should call betsService.findAllBets once', () => {
      const findAllBets = jest.spyOn(betsService, 'findAllBets');
      controller.findAllBets();
      expect(findAllBets).toHaveBeenCalledTimes(1);
    });
  });

  describe('FindAllGameBets', () => {
    it('should call betsService.findAllGameBets once', () => {
      const findAllGameBets = jest.spyOn(betsService, 'findAllGameBets');
      controller.findAllGameBets('1', '1');
      expect(findAllGameBets).toHaveBeenCalledTimes(1);
    });
  });

  describe('FindAllUserBets', () => {
    it('should call betsService.findAllUserBets once', () => {
      const findAllUserBets = jest.spyOn(betsService, 'findAllUserBets');
      controller.findAllUserBets('1');
      expect(findAllUserBets).toHaveBeenCalledTimes(1);
    });
  });

  describe('Delete', () => {
    it('should call betsService.remove once', () => {
      const removeBet = jest.spyOn(betsService, 'remove');
      controller.remove('1');
      expect(removeBet).toHaveBeenCalledTimes(1);
    });
  });
});

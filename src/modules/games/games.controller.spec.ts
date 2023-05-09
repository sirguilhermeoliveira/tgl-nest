import { Test, TestingModule } from '@nestjs/testing';

import { gameMock_1 } from '../../mocks/games.mocks';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

describe('GamesController', () => {
  let controller: GamesController;
  let gamesService: GamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [
        {
          provide: GamesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GamesController>(GamesController);
    gamesService = module.get<GamesService>(GamesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Create', () => {
    it('should call gamesService.create once', () => {
      const createGame = jest.spyOn(gamesService, 'create');
      controller.create(gameMock_1);
      expect(createGame).toHaveBeenCalledTimes(1);
    });
  });
  describe('Find all', () => {
    it('should call gamesService.findAll once', () => {
      const findAllGame = jest.spyOn(gamesService, 'findAll');
      controller.findAll();
      expect(findAllGame).toHaveBeenCalledTimes(1);
    });
  });
  describe('Delete', () => {
    it('should call gamesService.remove once', () => {
      const removeGame = jest.spyOn(gamesService, 'remove');
      controller.remove('1');
      expect(removeGame).toHaveBeenCalledTimes(1);
    });
  });
});

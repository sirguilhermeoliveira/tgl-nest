import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';

import { gameMock_1 } from '../../mocks/games.mocks';
import { PrismaService } from '../prisma/prisma.service';
import { GamesService } from './games.service';

describe('GamesService', () => {
  let gamesService: GamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        {
          provide: GamesService,
          useValue: {
            create: jest.fn().mockResolvedValue({ message: 'Game created successfully!' }),
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

    gamesService = module.get<GamesService>(GamesService);
  });

  describe('Create', () => {
    it('should create a game', async () => {
      jest.spyOn(gamesService, 'create');
      const result = await gamesService.create(gameMock_1);
      expect(result).toEqual({ message: 'Game created successfully!' });
    });
  });
});

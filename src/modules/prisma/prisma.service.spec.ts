import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: {
            onModuleInit: jest.fn().mockReturnValue({ message: 'Server is connecting...' }),
            enableShutdownHooks: jest
              .fn()
              .mockReturnValue({ message: 'Server is shutting down...' }),
          },
        },
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('OnModuleInit', () => {
    it('should init server', async () => {
      jest.spyOn(prismaService, 'onModuleInit');
      const result = await prismaService.onModuleInit();
      expect(result).toEqual({ message: 'Server is connecting...' });
    });
  });

  describe('enableShutdownHooks', () => {
    it('should shutdown server', async () => {
      jest.spyOn(prismaService, 'enableShutdownHooks');
      const mockApp = {
        close: jest.fn(),
      };
      const result = await prismaService.enableShutdownHooks(
        mockApp as unknown as INestApplication,
      );
      expect(result).toEqual({ message: 'Server is shutting down...' });
    });
  });
});

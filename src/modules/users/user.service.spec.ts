import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';

import { userMock_1 } from '../../mocks/users.mocks';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';

describe('UsersService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue({ message: 'User created successfully!' }),
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

    userService = module.get<UserService>(UserService);
  });

  describe('Create', () => {
    it('should create a user', async () => {
      jest.spyOn(userService, 'create');
      const result = await userService.create(userMock_1);
      expect(result).toEqual({ message: 'User created successfully!' });
    });
  });
});

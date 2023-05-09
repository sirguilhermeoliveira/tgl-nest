import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';

import {
  changeUserMock,
  changeUserPasswordMock,
  user_EmailMock_1,
  userMock_1,
  usersMock,
} from '../../mocks/users.mocks';
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
            delete: jest.fn().mockResolvedValue({ message: 'Deleted successfully!' }),
            findByEmail: jest.fn().mockResolvedValue(userMock_1),
            findAll: jest.fn().mockResolvedValue(usersMock),
            findOne: jest.fn().mockResolvedValue(userMock_1),
            changePassword: jest
              .fn()
              .mockResolvedValue({ message: 'Password changed successfully!' }),
            resetPassword: jest
              .fn()
              .mockResolvedValue({ message: 'Password reset successfully!' }),
            sendCode: jest.fn().mockResolvedValue({
              message: `Code sent successfully for ${user_EmailMock_1}`,
            }),
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('ResetPassword', () => {
    it('should reset user password after send code to email', async () => {
      jest.spyOn(userService, 'resetPassword');
      const result = await userService.resetPassword('test@gmail.com', '123456', '123Cba');
      expect(result).toEqual({ message: 'Password reset successfully!' });
    });
  });

  describe('SendCode', () => {
    it('should send code to user email', async () => {
      jest.spyOn(userService, 'sendCode');
      const result = await userService.sendCode({ email: user_EmailMock_1 });
      expect(result).toEqual({ message: `Code sent successfully for ${user_EmailMock_1}` });
    });
  });

  describe('Create', () => {
    it('should create a user', async () => {
      jest.spyOn(userService, 'create');
      const result = await userService.create(userMock_1);
      expect(result).toEqual({ message: 'User created successfully!' });
    });
  });

  describe('Delete', () => {
    it('should delete a user', async () => {
      jest.spyOn(userService, 'delete');
      const result = await userService.delete('1', userMock_1);
      expect(result).toEqual({ message: 'Deleted successfully!' });
    });
  });

  describe('ChangePassword', () => {
    it('should change the user password', async () => {
      jest.spyOn(userService, 'changePassword');
      const result = await userService.changePassword(
        '1',
        changeUserPasswordMock,
        changeUserMock,
      );
      expect(result).toEqual({ message: 'Password changed successfully!' });
    });
  });

  describe('FindAll', () => {
    it('should find all users', async () => {
      jest.spyOn(userService, 'findAll');
      const result = await userService.findAll();
      expect(result).toEqual(usersMock);
    });
  });

  describe('FindOne', () => {
    it('should find one user', async () => {
      jest.spyOn(userService, 'findOne');
      const result = await userService.findOne('2');
      expect(result).toEqual(userMock_1);
    });
  });

  describe('FindByEmail', () => {
    it('should find one user by email', async () => {
      jest.spyOn(userService, 'findByEmail');
      const result = await userService.findByEmail('user1@example.com');
      expect(result).toEqual(userMock_1);
    });
  });
});

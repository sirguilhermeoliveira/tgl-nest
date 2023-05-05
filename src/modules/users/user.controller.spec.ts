import { Test, TestingModule } from '@nestjs/testing';

import { userMock_1 } from '../../mocks/users.mocks';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            delete: jest.fn(),
            sendCode: jest.fn(),
            resetPassword: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('Forgot Password', () => {
    it('should call userService.sendCode once', () => {
      const forgotPassword = jest.spyOn(userService, 'sendCode');
      controller.sendCode({ email: 'teste@gmail.com' });
      expect(forgotPassword).toHaveBeenCalledTimes(1);
    });
  });

  describe('Reset Password', () => {
    it('should call userService.resetPassword once', () => {
      const resetPassword = jest.spyOn(userService, 'resetPassword');
      controller.resetPassword({
        email: 'teste@gmail.com',
        code: 'XXXXXX',
        newPassword: 'XXXXXX',
      });
      expect(resetPassword).toHaveBeenCalledTimes(1);
    });
  });

  describe('Create', () => {
    it('should call userService.create once', () => {
      const create = jest.spyOn(userService, 'create');
      controller.create(userMock_1);
      expect(create).toHaveBeenCalledTimes(1);
    });
  });

  describe('Find All', () => {
    it('should call userService.findAll once', () => {
      const findAll = jest.spyOn(userService, 'findAll');
      controller.findAll();
      expect(findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('Delete', () => {
    it('should call userService.delete once', () => {
      const deleteUser = jest.spyOn(userService, 'delete');
      controller.delete('1', userMock_1);
      expect(deleteUser).toHaveBeenCalledTimes(1);
    });
  });
});

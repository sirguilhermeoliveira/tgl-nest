import { Test, TestingModule } from '@nestjs/testing';

import { authMock_1 } from '../../mocks/auth.mocks';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('Login', () => {
    it('should call authService.login once', () => {
      const authLogin = jest.spyOn(authService, 'login');
      controller.login(authMock_1);
      expect(authLogin).toHaveBeenCalledTimes(1);
    });
  });
});

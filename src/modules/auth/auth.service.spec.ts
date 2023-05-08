import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';

import { authMock_1 } from '../../mocks/auth.mocks';
import { userMock_1 } from '../../mocks/users.mocks';
import { UserService } from '../../modules/users/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PrismaService,
        UserService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'mockToken'),
            findAll: jest.fn().mockResolvedValue({ message: 'User validated succesfully!' }),
          },
        },
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findByEmail: jest.fn().mockResolvedValue({
              ...userMock_1,
              password: '$2b$10$04bnT7xv49Uz/s5tg7bI9eWGVXY1O48UENX0y1.NidwZxqRSeYN.6',
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

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('login', () => {
    it('should return a user token', () => {
      const expectedToken = {
        access_token: 'mockToken',
      };
      const jwtSignSpy = jest.spyOn(jwtService, 'sign');
      expect(authService.login(authMock_1)).toEqual(expectedToken);
      expect(jwtSignSpy).toHaveBeenCalledWith({
        email: authMock_1.email,
        password: authMock_1.password,
      });
    });
  });

  describe('validateUser', () => {
    it('should validate a user', async () => {
      await userService.create(userMock_1);
      jest.spyOn(authService, 'validateUser');
      const result = await authService.validateUser(userMock_1.email, userMock_1.password);
      expect(result).toEqual({ message: 'User validated succesfully!' });
    });
  });
});

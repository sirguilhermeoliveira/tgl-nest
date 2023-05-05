import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';

import { UserService } from '../../modules/users/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        PrismaService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'mockToken'),
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
  });

  describe('login', () => {
    it('should return a user token', () => {
      const user = {
        id: 1,
        email: 'test@test.com',
        name: 'test',
        password: 'password',
      };
      const loginRequestBody = {
        email: user.email,
        password: user.password,
      };
      const expectedToken = {
        access_token: 'mockToken',
      };
      const jwtSignSpy = jest.spyOn(jwtService, 'sign');

      expect(authService.login(loginRequestBody)).toEqual(expectedToken);
      expect(jwtSignSpy).toHaveBeenCalledWith({
        sub: user.id,
        email: user.email,
        name: user.name,
      });
    });
  });
});

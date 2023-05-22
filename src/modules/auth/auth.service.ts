import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../../modules/users/user.service';
import { LoginRequestBody } from './models/login-request-body';
import { UserToken } from './models/user-token';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: LoginRequestBody): Promise<UserToken> {
    try {
      const userData = await this.userService.findByEmail(user.email);
      const jwtToken = this.jwtService.sign(userData);

      return {
        access_token: jwtToken,
      };
    } catch (error) {
      this.logger.error(`Error during login: ${error.message}`);
      throw new Error('Failed to login.');
    }
  }
  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new Error('Email doesnt exist on database.');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Password is incorrect.');
      }

      return Promise.resolve({ message: 'User validated successfully!' });
    } catch (error) {
      this.logger.error(`Error during user validation: ${error.message}`);
      throw new Error('Failed to validate user.');
    }
  }
}

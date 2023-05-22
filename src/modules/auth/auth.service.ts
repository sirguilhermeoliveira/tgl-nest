import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../../modules/users/user.service';
import { LoginRequestBody } from './models/LoginRequestBody';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: LoginRequestBody): Promise<UserToken> {
    const userData = await this.userService.findByEmail(user.email);
    const jwtToken = this.jwtService.sign(userData);

    return {
      access_token: jwtToken,
    };
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
      throw new Error(error.message);
    }
  }
}

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
  login(user: LoginRequestBody): UserToken {
    const payload = {
      email: user.email,
      password: user.password,
    };
    const jwtToken = this.jwtService.sign(payload);

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

      return { ...user, password: undefined };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../../modules/users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request?.headers?.authorization;
    const token = bearerToken.split(' ')[1];
    const jwtService = new JwtService({ secret: process.env.JWT_SECRET });
    const userDecodedInfo = jwtService.verify(token);
    return userDecodedInfo;
  },
);

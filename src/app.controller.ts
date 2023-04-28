import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { IsPublic } from './auth/decorators/is-public.decorator';

@Controller()
@ApiTags()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('me')
  getMe(@CurrentUser() user): string {
    return user;
  }
}

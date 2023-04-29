import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IsAdmin } from 'src/auth/decorators/is-admin.decorator';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post('/forgot-password')
  sendCode(@Body() email: { email: string }) {
    return this.userService.sendCode(email);
  }

  @IsPublic()
  @Post('/reset-password')
  async resetPassword(
    @Body() { email, code, newPassword }: { email: string; code: string; newPassword: string },
  ) {
    return this.userService.resetPassword(email, code, newPassword);
  }

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @IsAdmin()
  @Get('/find-all')
  findAll() {
    return this.userService.findAll();
  }

  @IsAdmin()
  @Delete('/delete/:id')
  delete(@Param('id') id: string, @CurrentUser() user: User) {
    return this.userService.delete(+id, user);
  }

  @Patch('/change-password/:id')
  changePassword(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: User,
  ) {
    return this.userService.changePassword(+id, updateUserDto, user);
  }
}

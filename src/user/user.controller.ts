import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsAdmin } from 'src/auth/decorators/is-admin.decorator';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }

  @Patch('/change-password/:id')
  changePassword(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.changePassword(+id, updateUserDto);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @IsPublic()
  @Post()
  async createAdminUser(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdminUser(createAdminDto);
  }
}

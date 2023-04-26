import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  async createAdminUser(createAdminDto: CreateAdminDto) {
    const data = {
      ...createAdminDto,
      password: await bcrypt.hash(createAdminDto.password, 10),
      isAdmin: true,
    };
    const adminUser = await this.prisma.admin.create({
      data,
    });

    return adminUser;
  }
}

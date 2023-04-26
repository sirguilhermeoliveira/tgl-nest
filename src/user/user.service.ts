import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };
    const createdUser = await this.prisma.user.create({
      data,
    });
    return {
      ...createdUser,
      password: undefined,
    };
  }

  async delete(id: number) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  async changePassword(id: number, user: UpdateUserDto) {
    const userPayload = await this.findOne(id);
    const isPasswordValid = await bcrypt.compare(user.password, userPayload.password);

    if (!isPasswordValid) {
      throw new Error('User password and new user password doenst match.');
    }
    await this.prisma.user.update({
      where: { id },
      data: {
        password: await bcrypt.hash(user.newPassword, 10),
      },
    });
    return Promise.resolve({ message: 'Change password succesfully!' });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}

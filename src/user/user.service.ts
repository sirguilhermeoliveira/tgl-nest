import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const data = {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      };
      await this.prisma.user.create({
        data,
      });

      const userName = createUserDto.name;

      await this.mailerService.sendMail({
        to: createUserDto.email,
        from: 'noreply@nestjs.com',
        subject: 'Welcome to TGL Nest! ',
        template: 'createdEmail',
        context: { name: userName },
      });
      if (createUserDto.isAdmin === false) {
        return Promise.resolve({ message: 'User created succesfully!' });
      } else {
        return Promise.resolve({ message: 'Admin created succesfully!' });
      }
    } catch {
      throw new Error('Failed to create user!');
    }
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

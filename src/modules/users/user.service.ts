import { Body, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
  ) {}

  async resetPassword(@Body() email: string, code: string, newPassword: string) {
    try {
      const user = await this.findByEmail(email);

      if (!user) {
        throw new Error("User doesn't exist in the database.");
      }

      const isCodeValid = await bcrypt.compare(code, user.forgot_password_token);

      if (!isCodeValid) {
        throw new Error('Code is invalid.');
      }

      if (user.forgot_password_expirationTime < new Date()) {
        throw new Error('Expired code.');
      }

      await this.prisma.user.update({
        where: {
          email,
        },
        data: {
          forgot_password_token: null,
          forgot_password_expirationTime: null,
          password: await bcrypt.hash(newPassword, 10),
        },
      });

      return { message: 'Password reset successfully!' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async sendCode(@Body() { email }: { email: string }) {
    try {
      const code = randomBytes(4).toString('hex');
      const user = await this.findByEmail(email);

      if (!user) {
        throw new Error("User doesn't exist in the database.");
      }

      const expirationTime = new Date();
      expirationTime.setMinutes(expirationTime.getMinutes() + 10);

      await this.prisma.user.update({
        where: { email },
        data: {
          ...user,
          forgot_password_token: await bcrypt.hash(code, 10),
          forgot_password_expirationTime: expirationTime,
        },
      });

      await this.mailerService.sendMail({
        to: email,
        from: 'noreply@nestjs.com',
        subject: 'Welcome to TGL Nest!',
        template: 'forgotPassword',
        context: {
          forgot_password_token: code,
          forgot_password_expirationTime: expirationTime,
        },
      });

      return { message: `Code sent successfully for ${email}` };
    } catch (error) {
      throw new Error(error.message);
    }
  }

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
      if (!createUserDto.isAdmin) {
        return Promise.resolve({ message: 'User created succesfully!' });
      } else {
        return Promise.resolve({ message: 'Admin created succesfully!' });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(id: number, user: User) {
    try {
      if (user.id === id) {
        throw new Error('Cannot delete the user you are currently using!');
      }

      await this.prisma.user.delete({
        where: { id },
      });

      await this.prisma.bet.deleteMany({
        where: { user_id: id },
      });

      return { message: 'Deleted successfully!' };
    } catch (error) {
      // handle errors gracefully
      throw new Error(error.message);
    }
  }

  async changePassword(id: number, updateUserDto: UpdateUserDto, user: User) {
    try {
      if (user.id !== id) {
        throw new Error("You cannot change another user's password!");
      }

      const userPayload = await this.findOne(id);
      const isPasswordValid = await bcrypt.compare(
        updateUserDto.password,
        userPayload.password,
      );

      if (!isPasswordValid) {
        throw new Error('User password and new user password do not match!');
      }

      await this.prisma.user.update({
        where: { id },
        data: {
          password: await bcrypt.hash(updateUserDto.newPassword, 10),
        },
      });

      return { message: 'Password changed successfully!' };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  findAll(page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize;
    return this.prisma.user.findMany({
      skip: skip,
      take: pageSize,
    });
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

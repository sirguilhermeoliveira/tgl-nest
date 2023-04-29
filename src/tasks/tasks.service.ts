import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly prisma: PrismaService,
  ) {}
  async handleDailyTask() {
    const users = await this.prisma.user.findMany();
    return users.map((user) =>
      this.mailerService.sendMail({
        to: user.email,
        from: 'noreply@nestjs.com',
        subject: 'Welcome to TGL Nest!',
        template: 'taskBets',
        context: { name: user.name },
      }),
    );
  }
}

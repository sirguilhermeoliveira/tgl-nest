import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { PrismaService } from '../../modules/prisma/prisma.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly prisma: PrismaService,
  ) {}
  async handleDailyTask() {
    try {
      const users = await this.prisma.user.findMany();

      users.forEach((user) => {
        this.prisma.bet.findMany({ where: { user_id: user.id } }).then((bets) => {
          const currentDate = new Date();
          const lastBetDate = bets[bets.length - 1];
          const targetDate = lastBetDate.created_At;
          const oneWeekLater = new Date(targetDate.getTime() + 7 * 24 * 60 * 60 * 1000);
          if (currentDate > oneWeekLater) {
            this.mailerService.sendMail({
              to: user.email,
              from: 'noreply@nestjs.com',
              subject: 'Come back to TGL Nest!',
              template: 'task-bets',
              context: {
                name: user.name,
              },
            });
          } else {
            return Promise.resolve({ message: 'No users with bets older than one week!' });
          }
        });
      });
      return Promise.resolve({ message: 'Emails sent!' });
    } catch (error) {
      this.logger.error(`Error handleDailyTask: ${error.message}`);
      throw new Error('Failed to do handleDailyTask');
    }
  }
}

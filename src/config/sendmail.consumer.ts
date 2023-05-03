import { Process, Processor } from '@nestjs/bull';
import { MailerService } from '@nestjs-modules/mailer';
import { Job } from 'bull';

import { SendMailDto } from './sendmail.dto';

@Processor('sendMail')
export class SendMailConsumer {
  constructor(private readonly mailerService: MailerService) {}

  @Process()
  async sendMailJob(job: Job<SendMailDto>) {
    const { data } = job;
    await this.mailerService.sendMail({
      to: data.to,
      subject: data.subject,
      template: data.template,
      context: data.context,
    });
  }
}

import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { BULL_CONFIG } from './bull.config';
import { SendMailConsumer } from './sendmail.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'sendMail',
      ...BULL_CONFIG,
    }),
  ],
  providers: [MailerService, SendMailConsumer],
  exports: [MailerService],
})
export class MailerQueueModule {}

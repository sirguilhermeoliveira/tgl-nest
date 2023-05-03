import { BullModuleOptions } from '@nestjs/bull';
import { RedisOptions } from 'ioredis';

import { REDIS_CONFIG } from './redis.config';

export const BULL_CONFIG: BullModuleOptions = {
  redis: {
    ...REDIS_CONFIG,
  } as RedisOptions,
  prefix: 'mailer',
};

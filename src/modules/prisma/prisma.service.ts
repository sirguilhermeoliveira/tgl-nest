import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    return { message: 'Server is connecting...' };
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      try {
        await app.close();
        return { message: 'Server is shutting down...' };
      } catch {
        this.$disconnect();
        return { message: 'Failed to shutdown server' };
      }
    });
  }
}

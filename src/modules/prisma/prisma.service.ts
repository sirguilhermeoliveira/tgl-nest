import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);
  async onModuleInit() {
    await this.$connect();
    return { message: 'Server is connecting...' };
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      try {
        await app.close();
        return { message: 'Server is shutting down...' };
      } catch (error) {
        this.$disconnect();
        this.logger.error(`Error during shutdown: ${error.message}`);
        return { message: 'Failed to shutdown server' };
      }
    });
  }
}

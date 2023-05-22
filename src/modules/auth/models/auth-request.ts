import { User } from '@prisma/client';

export interface AuthRequest {
  user: User;
}

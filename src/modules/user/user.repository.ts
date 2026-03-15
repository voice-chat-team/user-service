import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUserBy({ email, id }: { email?: string; id?: string }) {
    return await this.prisma.user.findUnique({
      where: {
        email,
        id,
      },
    });
  }
}

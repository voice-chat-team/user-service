import { Injectable } from '@nestjs/common';
import { User } from 'prisma/generated/client';
import { UserCreateInput } from 'prisma/generated/models';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUserBy({
    email,
    id,
    username,
  }: {
    email?: string;
    id?: string;
    username?: string;
  }): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        email,
        id,
        username,
      },
    });
  }

  async create(data: UserCreateInput): Promise<User> {
    return await this.prisma.user.create({
      data,
    });
  }
}

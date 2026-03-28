import { Injectable } from '@nestjs/common';
import { User } from 'prisma/generated/client';
import { UserCreateInput, UserWhereUniqueInput } from 'prisma/generated/models';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUserBy(whereInput: UserWhereUniqueInput): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: whereInput,
    });
  }

  async create(data: UserCreateInput): Promise<User> {
    return await this.prisma.user.create({
      data,
    });
  }
}

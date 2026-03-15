import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { User } from '@voice-chat/contracts/gen/user';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRespository: UserRepository) {}

  async getUser({ email, id }: { email?: string; id?: string }): Promise<User> {
    const user = await this.userRespository.getUserBy({ email, id });

    if (!user) throw new RpcException('Пользователь не найден');

    return {
      ...user,
      avatarUrl: user?.avatarUrl ?? '',
      createdAt: {
        seconds: Math.floor(user.createdAt.getTime() / 1000),
        nanos: Math.floor((user.createdAt.getTime() % 1000) * 1_000_000),
      },
      updatedAt: {
        seconds: Math.floor(user.updatedAt.getTime() / 1000),
        nanos: Math.floor((user.updatedAt.getTime() % 1000) * 1_000_000),
      },
    };
  }
}

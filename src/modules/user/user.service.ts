import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  GetUserRequest,
  type CreateUserRequest,
  type User,
} from '@voice-chat/contracts/gen/user';
import { UserRepository } from './user.repository';
import { User as PrismaUser } from 'prisma/generated/client';

@Injectable()
export class UserService {
  constructor(private readonly userRespository: UserRepository) {}

  async getUser(dto: GetUserRequest): Promise<User | null> {
    try {
      const user = await this.userRespository.getUserBy({
        id: dto.userId,
        username: dto.username,
        email: dto.email,
      });

      if (!user) return null;

      return this._mapUserEntityToGrpcEntity(user);
    } catch {
      throw new RpcException({
        code: 5,
        details: 'Пользователь не найден',
      });
    }
  }

  async createUser(dto: CreateUserRequest): Promise<User> {
    try {
      const user = await this.userRespository.create(dto);
      return this._mapUserEntityToGrpcEntity(user);
    } catch {
      throw new RpcException({
        code: 5,
        details: 'Не удалось создать пользователя',
      });
    }
  }

  private _mapUserEntityToGrpcEntity(user: PrismaUser) {
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

import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import type {
  GetUserByEmailResponse,
  GetUserByEmailRequest,
  GetUserByIdRequest,
  GetUserByIdResponse,
  CreateUserRequest,
  CreateUserResponse,
  GetUserByUsernameRequest,
  GetUserByUsernameResponse,
} from '@voice-chat/contracts/gen/user';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'GetUserByEmail')
  async getUserByEmail({
    email,
  }: GetUserByEmailRequest): Promise<GetUserByEmailResponse> {
    const user = await this.userService.getUser({ email });
    return { user: user ?? undefined };
  }

  @GrpcMethod('UserService', 'GetUserById')
  async getUserById({
    userId,
  }: GetUserByIdRequest): Promise<GetUserByIdResponse> {
    const user = await this.userService.getUser({ id: userId });
    return { user: user ?? undefined };
  }

  @GrpcMethod('UserService', 'GetUserByUsername')
  async getUserByUsername({
    username,
  }: GetUserByUsernameRequest): Promise<GetUserByUsernameResponse> {
    const user = await this.userService.getUser({ username });
    return { user: user ?? undefined };
  }

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(dto: CreateUserRequest): Promise<CreateUserResponse> {
    const user = await this.userService.createUser(dto);
    return { user: user ?? undefined };
  }
}

import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  type GetUserByEmailResponse,
  type GetUserByEmailRequest,
  type GetUserByIdRequest,
  type GetUserByIdResponse,
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
}

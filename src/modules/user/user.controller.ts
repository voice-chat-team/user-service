import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  GetUserByEmail,
  GetUserById,
  GetUserByUsername,
  USER_MESSAGE_PATTERNS,
} from '@voice-chat/contracts';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(USER_MESSAGE_PATTERNS.GET_BY_EMAIL)
  getUserByEmail(@Payload() { email }: GetUserByEmail) {
    console.log(email);
    return this.userService.getUserByEmail(email);
  }

  @MessagePattern(USER_MESSAGE_PATTERNS.GET_BY_ID)
  getUserByID(@Payload() { userId }: GetUserById) {
    return this.userService.getUserById(userId.toString());
  }

  @MessagePattern(USER_MESSAGE_PATTERNS.GET_BY_USERNAME)
  getUserByUsername(@Payload() { username }: GetUserByUsername) {
    return this.userService.getUserByUsername(username);
  }
}

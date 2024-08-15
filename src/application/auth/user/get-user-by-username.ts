import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { User } from "src/domain/auth/user";

interface GetUserByUsernameCommand {
  username: string
}

@Injectable()
export class GetUserByUsernameUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({username}: GetUserByUsernameCommand): Promise<User> {
    return this.userRepository.findByUsername(username)
  }
}
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDTO {
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(5, { message: 'Username must be at least 5 characters' })
  @IsString()
  username: string;
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(6, { message: 'Username must be at least 6 characters' })
  @IsString()
  password: string;
}
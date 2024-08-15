import { IsNotEmpty, IsString, MinLength, minLength } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(3, { message: 'Name must be at least 3 characters' })
  @IsString({})
  name: string;
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(5, { message: 'Username must be at least 5 characters' })
  @IsString({})
  username: string;
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @IsString({})
  password: string;
}

import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user/user.service'; // Import UserService

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {} // Inject UserService

  async register(createUserDto: CreateUserDto): Promise<any> {
    // Check if the user already exists
    const existingUser = await this.userService.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      return { message: 'User already exists' };
    }
    // Hash the password before saving it to the database
    return { message: 'User registered successfully', user: createUserDto };
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    // Check if the user exists
    const user = await this.userService.findByEmail(loginUserDto.email);
    if (!user) {
      return { message: 'User not found' };
    }
    // Check if the password is correct
    const isPasswordValid = await this.userService.validatePassword(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      return { message: 'Invalid password' };
    }
    return { message: 'Signed In', user: loginUserDto };
  }
}

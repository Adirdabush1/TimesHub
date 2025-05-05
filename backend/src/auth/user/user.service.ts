import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [
    {
      email: 'test@example.com',
      password: 'hashedpassword123',
    },
  ];

  async findByEmail(email: string): Promise<any> {
    return this.users.find((user) => user.email === email) || null;
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return plainPassword === hashedPassword;
  }
}

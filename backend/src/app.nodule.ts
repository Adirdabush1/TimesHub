import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './auth/users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/your-db-name'),
    UsersModule,
  ],
})
export class AppModule {}

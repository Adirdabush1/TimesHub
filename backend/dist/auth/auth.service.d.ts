import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema/user.schema';
export declare class AuthService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    register(createUserDto: CreateUserDto): Promise<User>;
}

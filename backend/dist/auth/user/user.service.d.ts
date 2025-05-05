import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    createUser(email: string, hashedPassword: string, name?: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
}

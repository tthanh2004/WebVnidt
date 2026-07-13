import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(): Promise<{
        id: string;
        email: string;
        role: string;
        lastLogin: Date | null;
        createdAt: Date;
    }[]>;
    createUser(body: CreateUserDto): Promise<{
        success: boolean;
        user: {
            id: string;
            email: string;
            role: string;
        };
    }>;
    updateUser(id: string, body: UpdateUserDto): Promise<{
        id: string;
        email: string;
        role: string;
    }>;
    deleteUser(id: string, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    changePassword(req: any, body: ChangePasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
}

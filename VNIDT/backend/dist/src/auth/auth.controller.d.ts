import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterAdminDto } from './dto/register-admin.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            role: string;
        };
    }>;
    setupAdmin(registerDto: RegisterAdminDto): Promise<{
        message: string;
        email: string;
    }>;
}

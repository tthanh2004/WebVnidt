import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { LoginDto } from './dto/login.dto';
import { RegisterAdminDto } from './dto/register-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Sai email hoặc mật khẩu');
    }

    const isPasswordValid = await argon2.verify(user.passwordHash, loginDto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Sai email hoặc mật khẩu');
    }

    await this.usersService.updateLastLogin(user.id);

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      }
    };
  }

  async setupInitialAdmin(registerDto: RegisterAdminDto) {
    // Check if any user exists
    const count = await this.usersService.countUsers();
    if (count > 0) {
      throw new BadRequestException('Hệ thống đã được khởi tạo.');
    }

    const passwordHash = await argon2.hash(registerDto.password);
    const user = await this.usersService.createUser({
      email: registerDto.email,
      passwordHash,
      role: 'super_admin',
    });

    return {
      message: 'Tạo tài khoản Super Admin thành công!',
      email: user.email,
    };
  }
}

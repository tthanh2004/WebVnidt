import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import * as argon2 from 'argon2';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('super_admin')
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Post()
  @Roles('super_admin')
  async createUser(@Body() body: CreateUserDto) {
    const { email, password, role } = body;
    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new HttpException('Email đã tồn tại', HttpStatus.BAD_REQUEST);
    }
    const hash = await argon2.hash(password);
    const user = await this.usersService.createUser({ email, passwordHash: hash, role: role || 'editor' });
    return { success: true, user: { id: user.id, email: user.email, role: user.role } };
  }

  @Put(':id')
  @Roles('super_admin')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const data: any = { ...body };
    if (data.password) {
      data.passwordHash = await argon2.hash(data.password);
      delete data.password;
    }
    return this.usersService.updateUser(id, data);
  }

  @Delete(':id')
  @Roles('super_admin')
  async deleteUser(@Param('id') id: string, @Request() req: any) {
    if (req.user.sub === id) {
      throw new HttpException('Không thể tự xóa chính mình', HttpStatus.BAD_REQUEST);
    }
    await this.usersService.deleteUser(id);
    return { success: true, message: 'Đã xóa tài khoản' };
  }

  @Put('me/change-password')
  // No @Roles needed, any authenticated user can change their own password
  async changePassword(@Request() req: any, @Body() body: ChangePasswordDto) {
    const { oldPassword, newPassword } = body;
    const user = await this.usersService.findById(req.user.sub);
    if (!user) throw new HttpException('Không tìm thấy tài khoản', HttpStatus.NOT_FOUND);
    const isMatch = await argon2.verify(user.passwordHash, oldPassword);
    if (!isMatch) {
      throw new HttpException('Mật khẩu cũ không chính xác', HttpStatus.BAD_REQUEST);
    }
    const newHash = await argon2.hash(newPassword);
    await this.usersService.updateUser(user.id, { passwordHash: newHash });
    return { success: true, message: 'Đổi mật khẩu thành công' };
  }
}

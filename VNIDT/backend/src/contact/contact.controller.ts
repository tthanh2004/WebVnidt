import { Controller, Post, Body, Res, HttpStatus, Logger, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { AuthGuard } from '../auth/auth.guard';
import type { Response } from 'express';

@Controller('contact')
export class ContactController {
  private readonly logger = new Logger(ContactController.name);

  constructor(private readonly contactService: ContactService) {}

  @Post()
  async sendContactEmail(@Body() body: CreateContactDto, @Res() res: Response) {
    try {
      await this.contactService.sendEmail(body);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Gửi yêu cầu tư vấn thành công! Chúng tôi sẽ liên hệ lại sớm nhất.',
      });
    } catch (error) {
      this.logger.error('Lỗi khi gửi email:', error.message);

      // Return user-friendly error message
      const message = error.message?.includes('SMTP_PASS')
        ? 'Hệ thống email chưa được cấu hình. Vui lòng liên hệ admin.'
        : 'Không thể gửi email lúc này. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua hotline.';

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async getContacts() {
    const data = await this.contactService.findAll();
    return {
      success: true,
      data,
    };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteContact(@Param('id') id: string) {
    await this.contactService.delete(id);
    return {
      success: true,
      message: 'Đã xóa yêu cầu tư vấn thành công.',
    };
  }
}

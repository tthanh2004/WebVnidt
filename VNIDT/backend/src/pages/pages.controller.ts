import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { PagesService } from './pages.service';
import { AuthGuard } from '../auth/auth.guard';
import { SavePageDto } from './dto/save-page.dto';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get(':slug')
  async getPage(@Param('slug') slug: string) {
    const page = await this.pagesService.findBySlug(slug);
    return {
      success: true,
      data: page ? JSON.parse(page.content) : null
    };
  }

  @UseGuards(AuthGuard)
  @Post(':slug')
  async savePage(@Param('slug') slug: string, @Body() body: SavePageDto) {
    const contentStr = JSON.stringify(body.content);
    await this.pagesService.upsertPage(slug, contentStr);
    return { success: true, message: 'Đã lưu cấu hình trang' };
  }
}

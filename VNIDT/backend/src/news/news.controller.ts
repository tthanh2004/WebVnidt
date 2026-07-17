import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getNews() {
    const list = await this.newsService.findAll();
    return { success: true, data: list };
  }

  @Get(':slugOrId')
  async getSingleNews(@Param('slugOrId') slugOrId: string) {
    const news = await this.newsService.findOne(slugOrId);
    if (!news) {
      return { success: false, message: 'Không tìm thấy tin tức.' };
    }
    return { success: true, data: news };
  }

  @UseGuards(AuthGuard)
  @Post()
  async createNews(@Body() body: CreateNewsDto, @Req() req: any) {
    const authorId = req.user?.sub;
    if (!authorId) {
      throw new Error('Không tìm thấy thông tin đăng nhập tác giả.');
    }
    const news = await this.newsService.create(body, authorId);
    return { success: true, data: news, message: 'Đã thêm tin tức thành công.' };
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateNews(@Param('id') id: string, @Body() body: CreateNewsDto) {
    const news = await this.newsService.update(id, body);
    return { success: true, data: news, message: 'Đã cập nhật tin tức thành công.' };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteNews(@Param('id') id: string, @Req() req: any) {
    await this.newsService.remove(id, req.user);
    return { success: true, message: 'Đã xóa tin tức thành công.' };
  }
}

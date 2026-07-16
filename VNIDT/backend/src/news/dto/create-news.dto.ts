import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên tin tức không được để trống' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Slug không được để trống' })
  slug: string;

  @IsString()
  @IsNotEmpty({ message: 'Mô tả tin tức không được để trống' })
  description: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsDateString({}, { message: 'Thời gian đăng không hợp lệ' })
  @IsOptional()
  publishedAt?: string;

  @IsString()
  @IsOptional()
  attachmentUrl?: string;

  @IsString()
  @IsOptional()
  attachmentName?: string;
}

import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty({ message: 'Nhãn phân loại (tag) không được để trống' })
  tag: string;

  @IsString()
  @IsNotEmpty({ message: 'Tên dự án không được để trống' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Mô tả dự án không được để trống' })
  description: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  attachmentUrl?: string;

  @IsString()
  @IsOptional()
  attachmentName?: string;
}

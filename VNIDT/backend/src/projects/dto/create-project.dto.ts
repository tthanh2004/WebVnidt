import { IsString, IsNotEmpty } from 'class-validator';

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
}

import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty({ message: 'Họ và tên không được để trống' })
  name: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Nội dung yêu cầu không được để trống' })
  message: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  organization?: string;

  @IsString()
  @IsNotEmpty({ message: 'Lĩnh vực quan tâm không được để trống' })
  sector: string;
}

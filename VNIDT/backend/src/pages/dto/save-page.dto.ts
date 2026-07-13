import { IsNotEmpty } from 'class-validator';

export class SavePageDto {
  @IsNotEmpty()
  content: any;
}

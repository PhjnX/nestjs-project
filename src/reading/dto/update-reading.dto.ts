import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateReadingTestDto {
  @IsOptional()
  @IsNumber()
  level?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  order_num?: number;

  @IsOptional()
  @IsNumber()
  time?: number;
}

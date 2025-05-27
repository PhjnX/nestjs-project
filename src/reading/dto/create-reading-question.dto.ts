import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateReadingQuestionDto {
  @IsNotEmpty()
  @IsString()
  question_text: string;

  @IsOptional()
  @IsString()
  options?: string;

  @IsNotEmpty()
  @IsString()
  correct_answer: string;

  @IsOptional()
  @IsString()
  explanation?: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  paragraph_heading?: string;

  @IsOptional()
  @IsString()
  line_reference?: string;

  @IsOptional()
  @IsBoolean()
  show_answer?: boolean;

  @IsOptional()
  @IsNumber()
  order_num?: number;
}

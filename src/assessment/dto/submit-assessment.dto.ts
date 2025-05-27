import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsString } from 'class-validator';

export class SubmitAssessmentDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  userId: number;

  @ApiProperty({
    example: [
      { questionId: 101, userAnswer: 'A' },
      { questionId: 102, userAnswer: 'FALSE' },
    ],
  })
  @IsArray()
  answers: { questionId: number; userAnswer: string }[];
}

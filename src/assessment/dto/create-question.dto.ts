import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({ example: 'What is the main idea of paragraph A?' })
  questionText: string;

  @ApiProperty({
    example: ['A. Topic A', 'B. Topic B', 'C. Topic C', 'D. Topic D'],
    required: false,
  })
  options?: string[];

  @ApiProperty({ example: 'A' })
  correctAnswer: string;

  @ApiProperty({ example: 'multiple-choice' })
  type: string;

  @ApiProperty({
    example: 'It is stated in the paragraph introduction.',
    required: false,
  })
  explanation?: string;

  @ApiProperty({ example: 'Heading IV', required: false })
  paragraphHeading?: string;

  @ApiProperty({ example: 'Lines 1-2', required: false })
  lineReference?: string;

  @ApiProperty({ example: true, required: false })
  showAnswer?: boolean;
}

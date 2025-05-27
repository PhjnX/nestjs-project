import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({ example: 'Matching Headings' })
  heading: string;

  @ApiProperty({ example: 'matching' })
  questionType: string;

  @ApiProperty({ example: 1 })
  from: number;

  @ApiProperty({ example: 5 })
  to: number;

  @ApiProperty({ example: 'Match the following headings with paragraphs.' })
  title: string;

  @ApiProperty({ example: 'Write the correct letter A–G.' })
  instruction: string;

  @ApiProperty({ example: 1 })
  startNumber: number;

  @ApiProperty({ example: 5 })
  endNumber: number;
}

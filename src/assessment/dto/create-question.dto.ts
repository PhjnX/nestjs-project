export class CreateQuestionDto {
  questionText: string;
  options?: string; // JSON string: '["A", "B", "C", "D"]'
  correctAnswer: string;
  explanation?: string;
  type: 'multiple-choice' | 'paragraph' | 'true-false-notgiven' | 'matching';
  paragraphHeading?: string;
}

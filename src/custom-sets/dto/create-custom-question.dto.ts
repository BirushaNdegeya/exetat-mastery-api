export class CreateCustomQuestionDto {
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation?: string | null;
}

export class CreateQuestionDto {
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  subject_id: string;
  year: number;
  passage?: string | null;
}

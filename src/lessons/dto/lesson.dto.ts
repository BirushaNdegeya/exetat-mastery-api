export class RecordLessonDto {
  lesson_id: string;
  score?: number;
  completed?: boolean;
}

export class UpdateLessonDto {
  score?: number;
  completed?: boolean;
}

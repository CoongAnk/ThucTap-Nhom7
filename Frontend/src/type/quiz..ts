export interface QuizDetailDTO {
  quizId: number;
  title: string;
  passScore: number;
  questions: QuestionDTO[];
}

export interface QuestionDTO {
  questionId: number;
  questionText: string;
  questionType: string;
  answers: AnswerDTO[];
}

export interface AnswerDTO {
  answerId: number;
  answerText: string;
}
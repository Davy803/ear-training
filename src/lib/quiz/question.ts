import { QuizOption } from "./quiz-option";

export type QuizScoring = {
  quizId: string;
  answeredQuestions: AnsweredQuestion[];
  currentStreak: number;
};

export type AnsweredQuestion = {
  quizId: string;
  selectedOption: QuizOption;
  correctOption: QuizOption;
};

export type QuizQuestion = {
  quizId: string;
  options: QuizOption[];
  correctOption: QuizOption;
};

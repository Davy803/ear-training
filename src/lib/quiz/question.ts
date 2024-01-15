import { Note } from "tone/Tone/core/type/Units";
import { QuizOption } from "./quiz-option";
import { sampleSize } from "lodash";

export type AnsweredQuestion = {
  selectedOption: QuizOption;
  correctOption: QuizOption;
};

export type QuizQuestion = {
  options: QuizOption[];
  correctOption: QuizOption;
};
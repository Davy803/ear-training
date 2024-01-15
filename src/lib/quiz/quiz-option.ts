import { Note } from "tone/Tone/core/type/Units";

export interface QuizOption {
  notes: Note[];
  key: string;
  text: string;
  asChord?: boolean;
}

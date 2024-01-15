import { Note } from "tone/Tone/core/type/Units";

export interface QuizOption {
  notes: Note[];
  text: string;
  asChord?: boolean;
}

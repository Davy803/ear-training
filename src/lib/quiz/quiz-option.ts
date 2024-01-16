import { Note } from "tone/Tone/core/type/Units";

export interface QuizOption {
  uniqueId: string;
  key: string;
  text: string;
  hintText: string;
  notes: Note[];
  asChord?: boolean;
  instrument: "piano";
}

import { Note } from "tone/Tone/core/type/Units";
import { InstrumentType } from "../tone/tonejs-Instruments";

export interface QuizOption {
  uniqueId: string;
  key: string;
  text: string;
  hintText: string;
  populateNotes: () => Note[];
  notes?: Note[];
  asChord?: boolean;
  instrument?: InstrumentType;
}

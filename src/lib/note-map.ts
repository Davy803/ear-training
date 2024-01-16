import { Note } from "tone/Tone/core/type/Units";

// prettier-ignore
export const StartingNoteOptions = ["C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4"] as const;
export type StartingNote = (typeof StartingNoteOptions)[number];

// prettier-ignore
export const NoteList: Note[] = 
[
  "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", 
  "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", 
  "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5", 
]

export const NoteMap: Record<string, Note[]> = {
  A: ["A3"],
  "A#": ["A#3"],
  B: ["B3"],
  C: ["C4"],
  "C#": ["C#4"],
  D: ["D4"],
  "D#": ["D#4"],
  E: ["E4"],
  F: ["F4"],
  "F#": ["F#4"],
  G: ["G4"],
  "G#": ["G#4"],
};

"use client";

/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/ejwRzEw5Z0k
 */
import { QuizFramework } from "@/components/component/quiz-framework";
import { Note } from "tone/Tone/core/type/Units";

export const IntervalMap: Record<string, Note[]> = {
  Unison: ["C4", "C4"],
  "Minor 2nd": ["C4", "Db4"],
  "Major 2nd": ["C4", "D4"],
  "Minor 3rd": ["C4", "Eb4"],
  "Major 3rd": ["C4", "E4"],
  "Perfect 4th": ["C4", "F4"],
  Tritone: ["C4", "F#4"],
  "Perfect 5th": ["C4", "G4"],
  "Minor 6th": ["C4", "Ab4"],
  "Major 6th": ["C4", "A4"],
  "Minor 7th": ["C4", "Bb4"],
  "Major 7th": ["C4", "B4"],
};

export function IntervalQuiz() {
  return (
    <QuizFramework
      headline={"Identify the interval"}
      noteMapping={IntervalMap}
    />
  );
}
"use client";

import * as Tone from "tone";
import { Note } from "tone/Tone/core/type/Units";
import { QuizOption } from "../quiz/quiz-option";

export interface PlayNoteProps {
  quizOption: QuizOption;
  time?: number;
}

let piano: Tone.Sampler;

export async function playNotes({ quizOption, time }: PlayNoteProps) {
  const asChord = quizOption.asChord;
  const notes = quizOption.notes ?? [];

  if (!piano) {
    // prettier-ignore
    piano = new Tone.Sampler({
      urls: {
        "C4": "C4.mp3",
        "F#4": "Fs4.mp3",
        "A4": "A4.mp3",
        "C5": "C5.mp3",
        "F#5": "Fs5.mp3",
        "B5": "B5.mp3",
      },
      release: 1,
      baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();
  }
  await Tone.loaded();
  const now = Tone.now();
  if (asChord) {
    piano.triggerAttackRelease(notes, "4n.", now + (time ?? 0));
  } else {
    notes.forEach((n, index) => {
      piano.triggerAttackRelease(n, "4n", now + (time ?? 0) + index / 2);
    });
  }
}

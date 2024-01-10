"use client";

import * as Tone from "tone";
import { Note } from "tone/Tone/core/type/Units";

const piano = new Tone.Sampler({
  urls: {
    C4: "C4.mp3",
    "D#4": "Ds4.mp3",
    "F#4": "Fs4.mp3",
    A4: "A4.mp3",
  },
  release: 1,
  baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();

export interface PlayNoteProps {
  notes: Note[];
  asChord?: boolean;
  time?: number;
}

export async function playNotes({ notes, asChord, time }: PlayNoteProps) {
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

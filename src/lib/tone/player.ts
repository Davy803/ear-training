"use client";

import * as Tone from "tone";
import { QuizOption } from "../quiz/quiz-option";
import {
  InstrumentType,
  SampleLibrary,
  SampleLibraryResult,
} from "./tonejs-Instruments";

export type InstrumentTypeWithRandom = InstrumentType | "random";

export interface PlayNoteProps {
  quizOption: QuizOption;
  instrument: InstrumentType;
}

const players = {} as SampleLibraryResult;

export async function playNotes({ quizOption, instrument }: PlayNoteProps) {
  const realInstrument = instrument;

  let player = players[realInstrument];

  if (!player) {
    const result = SampleLibrary.load({
      instruments: realInstrument,
    });

    player = players[realInstrument] = result[realInstrument].toDestination();
  }

  await Tone.loaded();

  const now = Tone.now();
  const duration = 0.75;

  const asChord = quizOption.asChord;

  const notes = quizOption.notes ?? [];

  const timeBetween = asChord ? 0.01 : 0.5;

  let elapsedTime = 0;

  notes.forEach((n, index) => {
    const incrementalTime = timeBetween * index * duration;
    player.triggerAttackRelease(n, duration, now + incrementalTime);
    elapsedTime += duration + incrementalTime;
  });

  const promise = new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, elapsedTime * 1000);
  });
  return promise;
}

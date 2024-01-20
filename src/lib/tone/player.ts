"use client";

import * as Tone from "tone";
import { QuizOption } from "../quiz/quiz-option";
import {
  InstrumentList,
  InstrumentType,
  SampleLibrary,
  SampleLibraryResult,
} from "./tonejs-Instruments";
import { sample } from "lodash";

export type InstrumentTypeWithRandom = InstrumentType | "random";

export interface PlayNoteProps {
  quizOption: QuizOption;
  time?: number;
  instrument: InstrumentType;
}

const players = {} as SampleLibraryResult;

export async function playNotes({
  quizOption,
  time,
  instrument,
}: PlayNoteProps) {
  const asChord = quizOption.asChord;
  const notes = quizOption.notes ?? [];

  const realInstrument = instrument;

  let player = players[realInstrument];

  if (!player) {
    const result = SampleLibrary.load({
      instruments: realInstrument,
      minify: true,
    });
    player = players[realInstrument] = result[realInstrument].toDestination();
  }

  await Tone.loaded();
  const now = Tone.now();
  const duration = 0.75;
  if (asChord) {
    player.triggerAttackRelease(notes, duration, now + (time ?? 0));
  } else {
    notes.forEach((n, index) => {
      player.triggerAttackRelease(
        n,
        duration,
        now + (time ?? 0) + index * duration,
      );
    });
  }
}

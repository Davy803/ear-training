"use client";

import { NoteQuiz } from "@/components/quizes/note-quiz";
import { useScoreStore } from "@/lib/state/score-context";

export default function Notes() {
  const resetAll = useScoreStore((store) => store.resetAll);
  resetAll();

  return <NoteQuiz />;
}

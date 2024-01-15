"use client";

import { ChordQuiz } from "@/components/quizes/chord-quiz";
import { useScoreStore } from "@/lib/state/score-context";

export default function Notes() {
  const resetAll = useScoreStore((store) => store.resetAll);
  resetAll();
  return <ChordQuiz />;
}

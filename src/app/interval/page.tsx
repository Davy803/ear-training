"use client";

import { IntervalQuiz } from "@/components/quizes/interval-quiz";
import { useScoreStore } from "@/lib/state/score-context";

export default function Interval() {
  const resetAll = useScoreStore((store) => store.resetAll);
  
  resetAll();
  
  return <IntervalQuiz />;
}

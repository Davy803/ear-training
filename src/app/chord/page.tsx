"use client";

import { ChordTest } from "@/components/component/chord-test";
import { useScoreStore } from "@/components/util/score-context";

export default function Notes() {
  const resetAll = useScoreStore((store) => store.resetAll);
  resetAll();
  return <ChordTest />;
}

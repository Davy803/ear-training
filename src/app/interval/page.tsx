"use client";

import { IntervalTest } from "@/components/component/interval-test";
import { useScoreStore } from "@/components/util/score-context";

export default function Interval() {
  //   const resetAll = useScoreStore((store) => store.resetAll);
  //   resetAll();
  return <IntervalTest />;
}

import { NoteTest } from "@/components/component/note-test";
import { useScoreStore } from "@/components/util/score-context";

export default function Notes() {
  const resetAll = useScoreStore((store) => store.resetAll);
  resetAll();
  return <NoteTest />;
}

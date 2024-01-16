import { Button } from "@/components/ui/button";
import { QuizOption } from "@/lib/quiz/quiz-option";
import { getQuizMasteryScore } from "@/lib/random";
import { useScoreDataFetcher, useScoreStore } from "@/lib/state/score-context";
import {
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "@radix-ui/react-popover";

import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";

export function MasteryScore({
  quizId,
  quizOptions,
}: {
  quizId: string;
  quizOptions: QuizOption[];
}) {
  useEffect(() => {
    return useScoreStore.subscribe(console.log);
  }, []);

  const { getAnsweredQuestions } = useScoreDataFetcher();

  const answeredQuestions = getAnsweredQuestions(quizId);

  const masteryScore = getQuizMasteryScore(quizOptions, answeredQuestions);
  return (
    <div className="text-xl text-center text-gray-500 dark:text-gray-400">
      Mastery Score <ScoreHelp />
      <div className="text-4xl font-bold text-correct">{masteryScore}</div>
    </div>
  );
}

function ScoreHelp() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} size={"smicon"}>
          <InfoCircledIcon />
        </Button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent className=" w-96 bg-gray-900 dark:bg-white  dark:text-gray-800 text-gray-100 p-4 border-b border-gray-300 dark:border-gray-700 rounded-md">
          <p>
            This score shows how close you are to mastering. Each correct answer
            has an internal score that goes up by 5 when you get it wrong and
            down by 3 when you get it right.
          </p>
          <p>
            These scores are added together for your final mastery score. If a
            score for a specific answer is already at 0 it won't go down any
            further even if you get it correct.
          </p>
          <p>
            The individual scores affect how likely that answer is to appear, so
            something that you've gotten wrong multiple times is more likely to
            appear again. Also the specific wrong answers you picked will be
            more likely to appear as options. This ensures you get more practice
            with the ones you are struggling with and are less likely to see
            ones you already know well (but they will still appear, just less
            likely).
          </p>
          <PopoverClose />
          <PopoverArrow />
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
}

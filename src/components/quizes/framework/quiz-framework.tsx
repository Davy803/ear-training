/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/ejwRzEw5Z0k
 */
import { Button } from "@/components/ui/button";
import { PlayNote } from "@/components/tone/play-note";

import { useEffect, useState } from "react";

import { Scoring } from "../scoring/scoring";
import {
  useScoreDataFetcher,
  useScoreStore,
} from "../../../lib/state/score-context";
import { QuizQuestion } from "@/lib/quiz/question";
import { getQuizQuestion } from "@/lib/random";
import { QuizOptions } from "./quiz-options";
import { ScoreDetails } from "../scoring/score-details";
import Link from "next/link";
import { QuizOption } from "@/lib/quiz/quiz-option";
import { MasteryScore } from "../scoring/mastery-score";

export interface QuizFrameworkProps {
  quizId: string;
  headline: string;
  quizOptions: QuizOption[];
  asChord?: boolean;
  preventSameAnswer?: boolean;
}

export function QuizFramework({
  quizId,
  headline,
  quizOptions,
  preventSameAnswer,
  asChord,
}: QuizFrameworkProps) {
  const [question, setQuestion] = useState<QuizQuestion | undefined>();

  const { getAnsweredQuestions } = useScoreDataFetcher();

  const answeredQuestions = getAnsweredQuestions(quizId);

  const resetAll = useScoreStore((store) => store.resetAll);

  const nextQuestion = () => {
    const newQuestion = getQuizQuestion(
      quizId,
      quizOptions,
      answeredQuestions,
      preventSameAnswer === true,
    );
    setQuestion(newQuestion);
  };

  // Because options are random, set them in useEffect so we don't have hydration error
  useEffect(() => {
    nextQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asChord, quizOptions]);

  // If we haven't populated options yet, don't render anything.
  if (!question) {
    return <></>;
  }

  return (
    <main className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6 py-8 px-4">
      <div className="w-full flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {headline}
        </h2>
        <PlayNote quizOption={question.correctOption} />
      </div>
      <MasteryScore quizId={quizId} quizOptions={quizOptions} />
      <QuizOptions question={question} nextQuestion={nextQuestion} />
      <Scoring quizId={quizId} />
      <ScoreDetails quizId={quizId} />
      <Button
        asChild
        variant="outline"
        onClick={() => {
          resetAll(quizId);
        }}
      >
        <Link href={"/"}>End Session</Link>
      </Button>
    </main>
  );
}

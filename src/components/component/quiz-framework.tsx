/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/ejwRzEw5Z0k
 */
import { Button } from "@/components/ui/button";
import { PlayNote } from "@/components/tone/play-note";

import { useEffect, useState } from "react";
import { Correct } from "@/components/component/correct";
import { Incorrect } from "@/components/component/incorrect";
import { playNotes } from "@/lib/tone/piano";

import { Scoring } from "./scoring";
import { useScoreStore } from "../../lib/state/score-context";
import { useShallow } from "zustand/react/shallow";
import { QuizOption } from "@/lib/quiz/quiz-option";
import { ScoreScreen } from "./score-screen";
import { QuizQuestion } from "@/lib/quiz/question";
import { getQuizQuestion } from "@/lib/random";
import { Note } from "tone/Tone/core/type/Units";

interface QuizOptionsProps {
  nextQuestion: () => void;
  question: QuizQuestion;
}

function QuizOptions({ question, nextQuestion }: QuizOptionsProps) {
  const [selected, setSelected] = useState<QuizOption>();
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>();

  const { correctOption: correctOption, options } = question;
  const scoring = useScoreStore(
    useShallow((state) => ({
      addAnsweredQuestions: state.addAnsweredQuestions,
      incrementStreak: state.incrementStreak,
      resetStreak: state.resetStreak,
    }))
  );
  if (!correctOption) {
    return <></>;
  }

  return (
    <div>
      <div className="w-full grid grid-cols-2 gap-4">
        {options.map((opt) => {
          let variant = "outline" as "outline" | "correct" | "incorrect";
          if (selected) {
            if (opt === correctOption) {
              variant = "correct";
            }
            if (opt === selected && selected !== correctOption) {
              variant = "incorrect";
            }
          }
          return (
            <Button
              key={opt.key}
              className="h-16"
              variant={variant}
              onClick={async () => {
                const currentIsCorrect = opt === correctOption;

                // Only do scoring if no answer currently selected
                if (selected === undefined) {
                  scoring.addAnsweredQuestions({
                    selectedOption: opt,
                    correctOption: correctOption,
                  });
                  if (currentIsCorrect) {
                    scoring.incrementStreak();
                  } else {
                    scoring.resetStreak();
                  }
                }

                setIsCorrect(currentIsCorrect);
                setSelected(opt);

                await playNotes({ quizOption: opt });
                if (!currentIsCorrect) {
                  await playNotes({
                    quizOption: correctOption,
                    time: correctOption.asChord
                      ? 1.5
                      : 1 + opt.notes.length / 2,
                  });
                }
              }}
            >
              {opt.text}
            </Button>
          );
        })}
      </div>
      {isCorrect === true ? (
        <Correct />
      ) : isCorrect === false ? (
        <Incorrect correctAnswer={correctOption} />
      ) : (
        <></>
      )}
      {isCorrect === undefined ? (
        <></>
      ) : (
        <div className="w-full flex justify-center">
          <Button
            className="w-40"
            onClick={() => {
              setIsCorrect(undefined);
              setSelected(undefined);

              nextQuestion();
            }}
          >
            Next Question
          </Button>
        </div>
      )}
    </div>
  );
}

export interface QuizFrameworkProps {
  headline: string;
  noteMapping: Record<string, Note[]>;
  asChord?: boolean;
}

export function QuizFramework({
  headline,
  noteMapping,
  asChord,
}: QuizFrameworkProps) {
  const [question, setQuestion] = useState<QuizQuestion | undefined>();
  const [showScore, setShowScore] = useState<boolean>(false);
  const answeredQuestions = useScoreStore((state) => state.answeredQuestions);

  const nextQuestion = () => {
    const newQuestion = getQuizQuestion(
      noteMapping,
      answeredQuestions,
      asChord
    );
    setQuestion(newQuestion);
  };

  // Because options are random, set them in useEffect so we don't have hydration error
  useEffect(() => {
    nextQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asChord, noteMapping]);

  const correctNotes = question?.correctOption?.notes;
  // If we haven't populated options yet, don't render anything.
  if (!correctNotes) {
    return <></>;
  }
  return (
    <main className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6 py-8 px-4">
      {showScore ? (
        <ScoreScreen />
      ) : (
        <>
          <div className="w-full flex flex-col items-center gap-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {headline}
            </h2>
            <PlayNote quizOption={question.correctOption} />
          </div>
          <QuizOptions question={question} nextQuestion={nextQuestion} />
          <Scoring noteMapping={noteMapping} />

          <Button
            className="ml-4"
            variant="outline"
            onClick={() => {
              setShowScore(true);
            }}
          >
            End Session
          </Button>
        </>
      )}
    </main>
  );
}
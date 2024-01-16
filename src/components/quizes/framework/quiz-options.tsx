import { Button } from "@/components/ui/button";
import { playNotes } from "@/lib/tone/piano";
import { useState } from "react";
import { QuizOption } from "@/lib/quiz/quiz-option";
import { useScoreStore } from "@/lib/state/score-context";
import { useShallow } from "zustand/react/shallow";
import { QuizQuestion } from "@/lib/quiz/question";

interface QuizOptionsProps {
  nextQuestion: () => void;
  question: QuizQuestion;
}

export function QuizOptions({ question, nextQuestion }: QuizOptionsProps) {
  const [selected, setSelected] = useState<QuizOption>();
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>();

  const { correctOption: correctOption, options } = question;
  const scoring = useScoreStore(
    useShallow((state) => ({
      addAnsweredQuestions: state.addAnsweredQuestions,
      incrementStreak: state.incrementStreak,
      resetStreak: state.resetStreak,
    })),
  );
  if (!correctOption) {
    return <></>;
  }

  const onClickAnswer = async (opt: QuizOption) => {
    const currentIsCorrect = opt === correctOption;

    // Only do scoring if no answer currently selected
    if (selected === undefined) {
      scoring.addAnsweredQuestions({
        quizId: question.quizId,
        selectedOption: opt,
        correctOption: correctOption,
      });
      if (currentIsCorrect) {
        scoring.incrementStreak(question.quizId);
      } else {
        scoring.resetStreak(question.quizId);
      }

      setIsCorrect(currentIsCorrect);
      setSelected(opt);
    }
    await playNotes({ quizOption: opt });
    if (!currentIsCorrect && selected === undefined) {
      await playNotes({
        quizOption: correctOption,
        time: correctOption.asChord ? 1.5 : 1 + (opt.notes?.length ?? 0) / 2,
      });
    }
  };

  return (
    <div className="w-full grid gap-8">
      <div className="grid grid-cols-2 gap-4">
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
              variant={variant}
              size={"lg"}
              onClick={() => onClickAnswer(opt)}
            >
              {opt.text}
            </Button>
          );
        })}
      </div>

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

import { Button } from "@/components/ui/button";
import { Correct } from "./correct";
import { Incorrect } from "./incorrect";
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
    }))
  );
  if (!correctOption) {
    return <></>;
  }

  const onClickAnswer = async (opt: QuizOption) => {
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

      setIsCorrect(currentIsCorrect);
      setSelected(opt);

      
      
    }
    await playNotes({ quizOption: opt });
    if (!currentIsCorrect && selected === undefined) {
        await playNotes({
          quizOption: correctOption,
          time: correctOption.asChord ? 1.5 : 1 + opt.notes.length / 2,
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
              className="h-16"
              variant={variant}
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
      {isCorrect === true ? (
        <Correct />
      ) : isCorrect === false ? (
        <Incorrect correctAnswer={correctOption} />
      ) : (
        <></>
      )}
    </div>
  );
}

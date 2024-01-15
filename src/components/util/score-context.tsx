import { QuizOption } from "@/lib/quiz/quiz-option";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Question = {
  selectedAnswer: QuizOption;
  correctAnswer: QuizOption;
};

export type ScoreState = {
  totalQuestions: number;
  answeredQuestions: Question[];
  currentStreak: number;

  getNumberAnswered: () => number;
  getNumberCorrect: () => number;
  setTotalQuestions: (total: number) => void;
  addAnsweredQuestions: (question: Question) => void;
  //   incrementCorrect: () => void;
  //   incrementNumberAnswered: () => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  resetAll: () => void;
};

export const useScoreStore = create<ScoreState>()(
  devtools(
    persist(
      (set, get) => ({
        totalQuestions: 20,
        // numberCorrect: 0,
        // numberAnswered: 0,
        answeredQuestions: [],
        currentStreak: 0,
        getNumberAnswered: () => get().answeredQuestions.length,
        getNumberCorrect: () =>
          get().answeredQuestions.filter(
            (x) => x.correctAnswer.text === x.selectedAnswer.text
          ).length,
        addAnsweredQuestions: (question: Question) =>
          set((state) => ({
            answeredQuestions: [...state.answeredQuestions, question],
          })),
        setTotalQuestions: (total) =>
          set((_state) => ({ totalQuestions: total })),
        // incrementCorrect: () =>
        //   set((state) => ({ numberCorrect: state.numberCorrect + 1 })),
        // incrementNumberAnswered: () =>
        //   set((state) => ({ numberAnswered: state.numberAnswered + 1 })),
        incrementStreak: () =>
          set((state) => ({ currentStreak: state.currentStreak + 1 })),
        resetStreak: () => set((_state) => ({ currentStreak: 0 })),

        resetAll: () =>
          set((_state) => ({
            answeredQuestions: [],
            currentStreak: 0,
          })),
      }),
      {
        name: "score-storage",
      }
    )
  )
);

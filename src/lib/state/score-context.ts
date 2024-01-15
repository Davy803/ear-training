import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AnsweredQuestion } from "../quiz/question";
import { getQuestionWeights } from "../random";

const currentSchemaVersion = 1;

export type ScoreState = {
  schemaVersion: number;
  totalQuestions: number;
  answeredQuestions: AnsweredQuestion[];
  currentStreak: number;

  getNumberAnswered: () => number;
  getNumberCorrect: () => number;

  setTotalQuestions: (total: number) => void;
  addAnsweredQuestions: (question: AnsweredQuestion) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  resetAll: () => void;
};

export const useScoreStore = create<ScoreState>()(
  devtools(
    persist(
      (set, get) => ({
        schemaVersion: currentSchemaVersion,
        totalQuestions: 20,
        answeredQuestions: [],
        currentStreak: 0,
        getNumberAnswered: () => get().answeredQuestions.length,
        getNumberCorrect: () =>
          get().answeredQuestions.filter(
            (x) => x.correctOption.key === x.selectedOption.key
          ).length,
        addAnsweredQuestions: (question: AnsweredQuestion) =>
          set((state) => ({
            answeredQuestions: [...state.answeredQuestions, question],
          })),
        setTotalQuestions: (total) =>
          set((_state) => ({ totalQuestions: total })),
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
        version: 1,
        migrate: (persistedState: any, version) => {
          if (version === 0) {
            if (persistedState.answeredQuestions?.length) {
              persistedState.answeredQuestions.forEach((x: any) => {
                x.selectedOption = x.selectedAnswer;
                x.selectedOption.key = x.selectedOption.text;
                delete x.selectedAnswer;

                x.correctOption = x.correctAnswer;
                x.correctOption.key = x.correctOption.text;
                delete x.correctAnswer;
              });
            }
          }

          return persistedState;
        },
      }
    )
  )
);

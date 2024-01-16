import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AnsweredQuestion, QuizScoring } from "../quiz/question";
import { immer } from "zustand/middleware/immer";

const currentSchemaVersion = 2;

export type ScoreState = {
  schemaVersion: number;
  quizes: QuizScoring[];
  addQuiz: (quiz: QuizScoring) => void;
  addAnsweredQuestions: (question: AnsweredQuestion) => void;
  incrementStreak: (quizId: string) => void;

  resetStreak: (quizId: string) => void;
  resetAll: (quizId: string) => void;
};

const createStore = immer<ScoreState>((set, get) => ({
  schemaVersion: currentSchemaVersion,
  quizes: [],

  addQuiz: (quiz) => {
    set((state) => {
      state.quizes.push(quiz);
    });
  },
  addAnsweredQuestions: (question: AnsweredQuestion) => {
    set((state) => {
      const quiz = state.quizes.find((x) => x.quizId === question.quizId);
      if (quiz) {
        quiz.answeredQuestions.push(question);
      }
    });
  },

  incrementStreak: (quizId) => {
    set((state) => {
      const quiz = state.quizes.find((x) => x.quizId === quizId);
      if (quiz) {
        quiz.currentStreak++;
      }
    });
  },
  resetStreak: (quizId) => {
    set((state) => {
      const quiz = state.quizes.find((x) => x.quizId === quizId);
      if (quiz) {
        quiz.currentStreak = 0;
      }
    });
  },

  resetAll: (quizId) => {
    set((state) => {
      const quiz = state.quizes.find((x) => x.quizId === quizId);
      if (quiz) {
        quiz.currentStreak = 0;
        quiz.answeredQuestions = [];
      }
    });
  },
}));

/**
 * This is separated out from the store itself because the get methods do not register a dependency change
 * So the UI doesn't update when it's supposed to.
 * @returns Methods to fetch data from the data store.
 */
export const useScoreDataFetcher = () => {
  const quizes = useScoreStore((x) => x.quizes);
  const addQuiz = useScoreStore((x) => x.addQuiz);

  const getQuiz = (quizId: string) => {
    let quiz = quizes.find((x) => x.quizId === quizId);
    if (!quiz) {
      quiz = {
        quizId: quizId,
        answeredQuestions: [],
        currentStreak: 0,
      };
      addQuiz(quiz);
    }
    return quiz;
  };

  const getAnsweredQuestions = (quizId: string) =>
    getQuiz(quizId).answeredQuestions ?? [];

  return {
    getQuiz: getQuiz,

    getAnsweredQuestions: getAnsweredQuestions,

    getCurrentStreak: (quizId: string) => getQuiz(quizId).currentStreak,

    getNumberAnswered: (quizId: string) => getAnsweredQuestions(quizId).length,

    getNumberCorrect: (quizId: string) =>
      getAnsweredQuestions(quizId).filter(
        (x) => x.correctOption.key === x.selectedOption.key,
      ).length,
  };
};

export const useScoreStore = create<ScoreState>()(
  devtools(
    persist(createStore, {
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
    }),
  ),
);

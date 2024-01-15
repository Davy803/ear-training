import { Note } from "tone/Tone/core/type/Units";
import { AnsweredQuestion, QuizQuestion } from "./quiz/question";
import { QuizOption } from "./quiz/quiz-option";
import { clamp, keyBy, shuffle } from "lodash";

export function getQuizMasteryScore(
  noteMapping: Record<string, Note[]>,
  answeredQuestions: AnsweredQuestion[]
): number {
  const keys = Object.keys(noteMapping);

  const weights = getQuestionWeights(answeredQuestions, keys, false);

  const weightValues = Object.values(weights);

  const masteryScore = weightValues.reduce((prev, x) => {
    return prev + (x === 0 ? 0 : x - 1);
  }, 0);

  return masteryScore;
}

export function getQuizQuestion(
  noteMapping: Record<string, Note[]>,
  answeredQuestions: AnsweredQuestion[],
  asChord = false
): QuizQuestion {
  const keys = Object.keys(noteMapping);

  const weights = getQuestionWeights(answeredQuestions, keys, true);

  const correctAnswerKey = weightedRandom(weights);

  const allOptions = keys.map(
    (key): QuizOption => ({
      key,
      text: key,
      notes: noteMapping[key],
      asChord,
    })
  );

  const allOptionsMap = keyBy(allOptions, "key");

  const options = getOptions(
    answeredQuestions,
    allOptionsMap,
    correctAnswerKey
  );

  return {
    correctOption: allOptionsMap[correctAnswerKey],
    options,
  };
}

function weightedRandom(weights: Record<string, number>) {
  const keys = Object.keys(weights);
  const newList = keys.reduce(
    (prev, key) => [...prev, ...Array(weights[key]).fill(key)],
    [] as string[]
  );
  const rand = baseRandom(0, newList.length - 1);
  const value = newList[rand];
  return value;
}

export function getQuestionWeights(
  answeredQuestions: AnsweredQuestion[],
  allOptionKeys: string[],
  withCorrection: boolean
) {
  const weights: Record<string, number> = {};

  // Start everything weighted at 10 so we don't run into the issue where a question rarely shows up due to weights of other questions
  for (let index = 0; index < allOptionKeys.length; index++) {
    const key = allOptionKeys[index];
    weights[key] = 10;
  }

  // Adjust weight based on historical accuracy
  for (let index = 0; index < answeredQuestions.length; index++) {
    const question = answeredQuestions[index];

    // Incorrect answers weigh more heavily than correct
    if (question.correctOption.key !== question.selectedOption.key) {
      weights[question.correctOption.key] += 5;
    } else {
      weights[question.correctOption.key] -= 3;
    }
  }

  // Ensure all weights are between 1 and 100
  for (let index = 0; index < allOptionKeys.length; index++) {
    const key = allOptionKeys[index];
    const currentWeight = weights[key];
    weights[key] = clamp(currentWeight, 1, 100);
  }

  if (withCorrection) {
    // Don't ask same question twice
    const previousCorrectOption =
      answeredQuestions[answeredQuestions.length - 1]?.correctOption;
    if (previousCorrectOption) {
      weights[previousCorrectOption.key] = 0;
    }

    // Reduce chance of asking the 2nd to last question
    const penultimateCorrectOption =
      answeredQuestions[answeredQuestions.length - 1]?.correctOption;
    if (penultimateCorrectOption) {
      weights[penultimateCorrectOption.key] = Math.round(
        weights[penultimateCorrectOption.key] / 2
      );
    }
  }

  return weights;
}

function getOptions(
  answeredQuestions: AnsweredQuestion[],
  availableOptions: Record<string, QuizOption>,
  correctOptionKey: string,
  numberOfOptions = 4,
  selectedOptions: QuizOption[] = [availableOptions[correctOptionKey]]
) {
  const weights: Record<string, number> = {};

  const relevantQuestions = answeredQuestions.filter(
    (x) => x.correctOption.key === correctOptionKey
  );
  const selectedOptionsKeys = selectedOptions.map((x) => x.key);

  const isValidOption = (option: QuizOption, correctOption: string) => {
    const isIncorrect = correctOption !== option.key;
    const notAlreadyAdded = !selectedOptionsKeys.includes(option.key);

    return isIncorrect && notAlreadyAdded;
  };
  for (let index = 0; index < relevantQuestions.length; index++) {
    const question = relevantQuestions[index];

    if (isValidOption(question.selectedOption, question.correctOption.key)) {
      weights[question.selectedOption.key] =
        (weights[question.selectedOption.key] ?? 0) + 1;
    }
  }

  // No more historically incorrect answers, pick at random
  if (Object.keys(weights).length === 0) {
    const validOptions = Object.values(availableOptions).filter((x) =>
      isValidOption(x, correctOptionKey)
    );

    for (let index = 0; index < validOptions.length; index++) {
      const opt = validOptions[index];
      weights[opt.text] = 1;
    }
  }

  const optionKey = weightedRandom(weights);

  const newOptions = [...selectedOptions, availableOptions[optionKey]];

  if (newOptions.length < numberOfOptions) {
    return getOptions(
      answeredQuestions,
      availableOptions,
      correctOptionKey,
      numberOfOptions,
      newOptions
    );
  } else if (newOptions.length > numberOfOptions) {
    throw Error(
      `Got more than 'numberOfOptions' options (${newOptions.length} > ${numberOfOptions})`
    );
  } else {
    return shuffle(newOptions);
  }
}

/**
 * The base implementation of `_.random` without support for returning
 * floating-point numbers.
 *
 * @private
 * @param {number} lower The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the random number.
 */
function baseRandom(lower: number, upper: number) {
  return lower + Math.floor(Math.random() * (upper - lower + 1));
}

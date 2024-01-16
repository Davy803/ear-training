import { Button } from "@/components/ui/button";
import { CollapsibleComponent } from "@/components/ui/collapsible";
import { useScoreDataFetcher, useScoreStore } from "@/lib/state/score-context";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { groupBy } from "lodash";

export function ScoreDetails({ quizId }: { quizId: string }) {
  const { getAnsweredQuestions } = useScoreDataFetcher();

  const answeredQuestions = getAnsweredQuestions(quizId);

  const grouping = groupBy(answeredQuestions, (x) => x.correctOption.text);
  const questions = Object.keys(grouping).map((key) => {
    const answers = grouping[key];
    const correctAnswers = answers.filter(
      (x) => x.correctOption.key === x.selectedOption.key,
    );
    return {
      name: key,
      correct: correctAnswers.length,
      incorrect: answers.length - correctAnswers.length,
      answers: answers,
    };
  });
  return (
    <div className="w-full">
      <CollapsibleComponent buttonText="Show Score Details">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8">
          Score Details
        </h2>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="border-b border-gray-300 dark:border-gray-700">
              <tr>
                <th className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  Option
                </th>
                <th className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  Correct
                </th>
                <th className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  Incorrect
                </th>
                <th className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  Show Details
                </th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question) => {
                const incorrectAnswers = question.answers.filter(
                  (x) => x.correctOption.key !== x.selectedOption.key,
                );

                const answerGrouping = groupBy(
                  incorrectAnswers,
                  (x) => x.selectedOption.text,
                );

                const answerSummaries = Object.keys(answerGrouping).map(
                  (key) => ({
                    name: key,
                    count: answerGrouping[key].length,
                  }),
                );
                return (
                  <Collapsible asChild key={question.name}>
                    <>
                      <tr className="text-gray-700 dark:text-gray-300">
                        <td className="px-4 py-3">{question.name}</td>
                        <td className="px-4 py-3">{question.correct}</td>
                        <td className="px-4 py-3">{question.incorrect}</td>
                        <td className="px-4 py-3">
                          <CollapsibleTrigger>
                            <Button>Toggle Details</Button>
                          </CollapsibleTrigger>
                        </td>
                      </tr>
                      <CollapsibleContent asChild>
                        <tr>
                          <td colSpan={4}>
                            <table className="w-full">
                              <thead>
                                <tr>
                                  <th className="pl-10">
                                    Incorrectly Selected Answer
                                  </th>
                                  <th>Times selected</th>
                                </tr>
                              </thead>
                              <tbody>
                                {answerSummaries.map((answer) => (
                                  <tr key={answer.name}>
                                    <td className="pl-10">{answer.name}</td>
                                    <td>{answer.count}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </CollapsibleContent>
                    </>
                  </Collapsible>
                );
              })}
            </tbody>
          </table>
        </div>
      </CollapsibleComponent>
    </div>
  );
}

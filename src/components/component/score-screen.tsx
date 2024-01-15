/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/N6GF1tKyY25
 */
import { Button } from "@/components/ui/button";
import { ResponsiveBar } from "@nivo/bar";
import { useScoreStore } from "../../lib/state/score-context";
import { useShallow } from "zustand/react/shallow";
import { groupBy } from "lodash";

export function ScoreScreen() {
  const { getNumberCorrect, getNumberAnswered, currentStreak, totalQuestions } =
    useScoreStore(
      useShallow((state) => ({
        getNumberCorrect: state.getNumberCorrect,
        getNumberAnswered: state.getNumberAnswered,
        currentStreak: state.currentStreak,
        totalQuestions: state.totalQuestions,
      }))
    );
  const numberCorrect = getNumberCorrect();
  const numberAnswered = getNumberAnswered();
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Score Summary
      </h2>
      <BarChart className="w-full aspect-[4/3]" />
      <div className="w-full grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Total Questions
          </h3>
          <p className="text-2xl font-bold text-blue-500 dark:text-blue-300">
            {totalQuestions}
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Correct Answers
          </h3>
          <p className="text-2xl font-bold text-green-500 dark:text-green-300">
            {numberCorrect}
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Incorrect Answers
          </h3>
          <p className="text-2xl font-bold text-red-500 dark:text-red-300">
            {numberAnswered - numberCorrect}
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Score
          </h3>
          <p className="text-2xl font-bold text-purple-500 dark:text-purple-300">
            10
          </p>
        </div>
      </div>
      <Button className="w-40">New Session</Button>
    </div>
  );
}

function BarChart(props: { className: string }) {
  const { answeredQuestions } = useScoreStore(
    useShallow((state) => ({
      answeredQuestions: state.answeredQuestions,
    }))
  );

  const grouping = groupBy(answeredQuestions, (x) => x.correctOption.text);
  const data = Object.keys(grouping).map((key) => {
    const answers = grouping[key];
    const correctAnswers = answers.filter(
      (x) => x.correctOption.key === x.selectedOption.key
    );
    return {
      name: key,
      correct: correctAnswers.length,
      incorrect: answers.length - correctAnswers.length,
    };
  });
  const format: (label: string | number) => string | number = (v) =>
    `${(v as number) * 100}%`;

  return (
    <div {...props}>
      <ResponsiveBar
        data={data}
        keys={["correct", "incorrect"]}
        indexBy="name"
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "paired" }}
        defs={[
          {
            id: "correct",
            type: "patternSquares",
            background: "inherit",
            color: "rgb(134 239 172)",
            size: 4,
            padding: 0,
          },
          {
            id: "incorrect",
            type: "patternSquares",
            background: "inherit",
            color: "rgb(252 165 165)",
            padding: 0,
          },
        ]}
        fill={[
          {
            match: {
              id: "correct",
            },
            id: "correct",
          },
          {
            match: {
              id: "incorrect",
            },
            id: "incorrect",
          },
        ]}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Number",
          legendPosition: "middle",
          legendOffset: -45,
          truncateTickAt: 0,
          format,
        }}
        theme={{
          tooltip: {
            container: {
              fontSize: "12px",
              color: "white",
            },
          },
          background: "white",
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelFormat={format}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  );
}

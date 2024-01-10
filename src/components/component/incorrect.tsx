/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/ejwRzEw5Z0k
 */
import { TestOption } from "@/components/component/test-framework";

interface IncorrectProps {
  correctAnswer: TestOption;
}

export function Incorrect({ correctAnswer }: IncorrectProps) {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Incorrect Answer!
      </h2>
      <XIcon className="w-24 h-24 text-red-500 dark:text-red-300" />
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Oops! The correct note was{" "}
        <span className="font-bold text-green-500 dark:text-green-300">
          {correctAnswer.text}
        </span>
        .
      </p>
    </div>
  );
}

function XIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { PlayNoteProps, playNotes } from "@/lib/tone/piano";

export function PlayNote(props: PlayNoteProps) {
  return (
    <Button
      className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
      onClick={() => {
        playNotes(props);
      }}
    >
      <PlayIcon className="w-8 h-8 text-gray-900 dark:text-gray-100" />
    </Button>
  );
}

function PlayIcon(props: { className: string }) {
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
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

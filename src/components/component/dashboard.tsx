/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/UIXvmXomXbD
 */
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import Link from "next/link";

export function Dashboard() {
  return (
    <main className="p-6 grid gap-6">
      <div className="grid gap-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Exercises
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-white dark:bg-gray-900 shadow-md">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Identify Notes
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Test your ability to recognize individual notes.
              </p>
              <Button asChild className="mt-4" variant="outline">
                <Link href={"/notes"}>Start Exercise</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-900 shadow-md">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Identify Intervals
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Test your ability to recognize intervals between notes.
              </p>
              <Button asChild className="mt-4" variant="outline">
                <Link href={"/interval"}>Start Exercise</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-900 shadow-md">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Identify Chords
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Test your ability to recognize different chords.
              </p>
              <Button asChild className="mt-4" variant="outline">
                <Link href={"/chord"}>Start Exercise</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

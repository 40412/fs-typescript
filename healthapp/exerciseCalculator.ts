interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyHours: number[],
  target: number,
): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((h) => h > 0).length;
  const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;

  const success = average >= target;

  let rating = 1;
  let ratingDescription = "bad";

  if (average >= target) {
    rating = 3;
    ratingDescription = "excellent";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseExerciseArguments = (args: string[]) => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);
  const hours = args.slice(3).map((n) => Number(n));

  if (isNaN(target) || hours.some((h) => isNaN(h))) {
    throw new Error("Provided values were not numbers!");
  }

  return { target, hours };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, hours } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(hours, target));
  } catch (e: unknown) {
    let msg = "Something went wrong.";
    if (e instanceof Error) msg += " Error: " + e.message;
    console.log(msg);
  }
}

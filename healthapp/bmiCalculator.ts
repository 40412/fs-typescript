export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;

  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal range";
  if (bmi < 30) return "Overweight";
  return "Obese";
};

const parseBmiArguments = (args: string[]) => {
  if (args.length !== 4) {
    throw new Error("Expected height and weight as arguments");
  }

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Provided values were not numbers!");
  }

  return { height, weight };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (e: unknown) {
    let msg = "Something went wrong.";
    if (e instanceof Error) msg += " Error: " + e.message;
    console.log(msg);
  }
}

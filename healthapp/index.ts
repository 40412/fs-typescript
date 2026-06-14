import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (!height || !weight || isNaN(heightNum) || isNaN(weightNum)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(heightNum, weightNum);

  return res.send({
    weight: weightNum,
    height: heightNum,
    bmi,
  });
});

app.post("/exercises", (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment,
                    @typescript-eslint/no-unsafe-member-access,
                    @typescript-eslint/no-unsafe-argument,
                    @typescript-eslint/no-unsafe-call */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any = req.body;

  if (!body.daily_exercises || !body.target) {
    return res.status(400).send({ error: "parameters missing" });
  }

  if (
    !Array.isArray(body.daily_exercises) ||
    body.daily_exercises.some((d: unknown) => isNaN(Number(d))) ||
    isNaN(Number(body.target))
  ) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const daily = body.daily_exercises.map((d: unknown) => Number(d));
  const target = Number(body.target);

  const result = calculateExercises(daily, target);

  return res.send(result);
  /* eslint-enable @typescript-eslint/no-unsafe-assignment,
                    @typescript-eslint/no-unsafe-member-access,
                    @typescript-eslint/no-unsafe-argument, 
                    @typescript-eslint/no-unsafe-call */
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

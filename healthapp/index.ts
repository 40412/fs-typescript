import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

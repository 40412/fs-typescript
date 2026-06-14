import express from "express";
import {
  addPatient,
  getNonSensitivePatients,
} from "../services/patientService.ts";
import { toNewPatientEntry } from "../utils.ts";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getNonSensitivePatients());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const added = addPatient(newPatient);
    res.json(added);
  } catch (error: unknown) {
    let message = "Something went wrong.";
    if (error instanceof Error) {
      message += " Error: " + error.message;
    }
    res.status(400).send(message);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  /*  const body: any = req.body;

  const newPatient: NewPatient = {
    name: body.name,
    dateOfBirth: body.dateOfBirth,
    ssn: body.ssn,
    gender: body.gender,
    occupation: body.occupation,
  };

  const added = addPatient(newPatient);
  res.json(added); */
});

export default router;

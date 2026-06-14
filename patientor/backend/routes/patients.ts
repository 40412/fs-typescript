import express from "express";
import {
  addPatient,
  getNonSensitivePatients,
} from "../services/patientService.ts";
import type { NewPatient } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getNonSensitivePatients());
});

router.post("/", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any = req.body;

  const newPatient: NewPatient = {
    name: body.name,
    dateOfBirth: body.dateOfBirth,
    ssn: body.ssn,
    gender: body.gender,
    occupation: body.occupation,
  };

  const added = addPatient(newPatient);
  res.json(added);
});

export default router;

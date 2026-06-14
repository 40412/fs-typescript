import express from "express";
import {
  addPatient,
  getNonSensitivePatients,
} from "../services/patientService.ts";
import { toNewPatientEntry } from "../validators/patientValidator.ts";
import { ZodError } from "zod";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getNonSensitivePatients());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const added = addPatient(newPatient);
    return res.json(added);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return res.status(400).json(error.issues);
    }
    return res.status(400).send("Invalid data");
  }
});

export default router;

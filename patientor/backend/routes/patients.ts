import express from "express";
import {
  addPatient,
  getNonSensitivePatients,
  getPatientById,
} from "../services/patientService.ts";
import { toNewPatientEntry } from "../validators/patientValidator.ts";
import { ZodError } from "zod";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  const patient = getPatientById(req.params.id);

  if (!patient) {
    return res.status(404).send({ error: "Patient not found" });
  }

  return res.json(patient);
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

import express from "express";
import {
  addEntry,
  addPatient,
  getNonSensitivePatients,
  getPatientById,
} from "../services/patientService.ts";
import { toNewPatientEntry } from "../validators/patientValidator.ts";
import { ZodError } from "zod";
import { toNewEntry } from "../schemas/patient.ts";

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

router.post("/:id/entries", (req, res) => {
  try {
    const patientId = req.params.id;
    const newEntry = toNewEntry(req.body); // validation function
    const addedEntry = addEntry(patientId, newEntry);
    res.json(addedEntry);
  } catch (e: unknown) {
    let errorMessage = "Something went wrong.";
    if (e instanceof Error) {
      errorMessage += " Error: " + e.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;

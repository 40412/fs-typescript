import express from "express";
import { getNonSensitivePatients } from "../services/patientService.ts";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getNonSensitivePatients());
});

export default router;

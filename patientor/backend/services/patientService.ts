import patients from "../data/patients.ts";
import type { NonSensitivePatient, Patient } from "../types.ts";
import type { NewPatient } from "../types.ts";
import { v1 as uuid } from "uuid";

export const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const addPatient = (entry: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    entries: [],
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

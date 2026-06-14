import { NewPatientSchema } from "../schemas/patient.ts";

export const toNewPatientEntry = (object: unknown) => {
  return NewPatientSchema.parse(object);
};

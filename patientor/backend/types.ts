export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: unknown[];
}

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
export type NewPatient = Omit<Patient, "id" | "entries">;
export type Gender = (typeof Gender)[keyof typeof Gender];

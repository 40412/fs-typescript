export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
export type NewPatient = Omit<Patient, "id" | "entries">;
export type Gender = (typeof Gender)[keyof typeof Gender];

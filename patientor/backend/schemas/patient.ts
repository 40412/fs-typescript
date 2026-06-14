import { z } from "zod";
import { Gender, HealthCheckRating } from "../types.ts";
import type { EntryWithoutId } from "../types.ts";

export const NewPatientSchema = z.object({
  name: z.string().min(1),
  dateOfBirth: z.string().date(),
  ssn: z.string().min(1),
  gender: z.nativeEnum(Gender),
  occupation: z.string().min(1),
});

export type NewPatientInput = z.infer<typeof NewPatientSchema>;

const baseEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const healthCheckSchema = baseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const hospitalSchema = baseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string(),
  }),
});

const occupationalSchema = baseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date(),
    })
    .optional(),
});

const entrySchema = z.union([
  healthCheckSchema,
  hospitalSchema,
  occupationalSchema,
]);

export const toNewEntry = (obj: unknown): EntryWithoutId => {
  return entrySchema.parse(obj);
};

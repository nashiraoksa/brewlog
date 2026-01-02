import { Step } from "./step";

import z from "zod";

export const StepSchema = z.object({
  order: z.number(),
  session: z.string().min(1),
  water: z.number(),
  time: z.number(),
});

// import { z } from "zod";

export const BrewSchema = z.object({
  date: z.string().nullable().optional(),

  method: z.string().min(1, "Method is required"),

  grindSetting: z.string().nullable().optional(),

  coffeeAmount: z.number().min(0.1, "Coffee amount is required"),
  waterAmount: z.number().min(1, "Water amount is required"),
  waterTemperature: z.number().min(1, "Temperature is required"),

  temperatureMetric: z.enum(["C", "F"]),

  brewMinutes: z.number().min(0, "Minutes required"),
  brewSeconds: z.number().min(0, "Seconds required"),

  aroma: z.number().min(0).max(10),
  sweetness: z.number().min(0).max(10),
  acidity: z.number().min(0).max(10),
  bitterness: z.number().min(0).max(10),
  body: z.number().min(0).max(10),
  overall: z.number().min(0).max(10),

  notes: z.string().nullable().optional(),

  grinderId: z.string().nullable().optional(),
  dripperId: z.string().nullable().optional(),
  espressoMachineId: z.string().nullable().optional(),
  filterId: z.string().nullable().optional(),
  kettleId: z.string().nullable().optional(),
  scaleId: z.string().nullable().optional(),

  steps: z.array(StepSchema).default([]),
});

export type BrewFormValues = z.infer<typeof BrewSchema>;

export type Brew = BrewFormValues & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

// export type Brew = {
//   id: string;
//   date: string | null;
//   method: string;
//   grindSetting?: string | null;
//   coffeeAmount: number;
//   waterAmount: number;
//   waterTemperature: number;
//   temperatureMetric: string;
//   brewMinutes: number;
//   brewSeconds: number;

//   aroma: number;
//   sweetness: number;
//   acidity: number;
//   bitterness: number;
//   body: number;
//   overall: number;

//   notes?: string | null;

//   steps: Step[];

//   createdAt: string;
//   updatedAt: string;
// };

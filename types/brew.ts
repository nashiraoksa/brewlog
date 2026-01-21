import { EspressoMachine } from "@/lib/generated/prisma/client";
import { Coffee } from "./coffee";
import { Dripper } from "./dripper";
import { Grinder } from "./grinder";

import z from "zod";
import { Scale } from "./scale";
import { Filter } from "./filter";
import { Kettle } from "./kettle";

export const StepSchema = z.object({
  order: z.number(),
  session: z.string().min(1),
  water: z.number(),
  time: z.number(),
});

export const BrewSchema = z.object({
  date: z.coerce.date().optional(),

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

  coffeeId: z.string().nullable().optional(),

  steps: z.array(StepSchema).default([]),
});

export type BrewFormValues = z.infer<typeof BrewSchema>;

export type Brew = BrewFormValues & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export interface BrewWithCoffee extends Brew {
  coffee: Coffee;
  grinder?: Grinder;
  dripper?: Dripper;
  espressoMachine?: EspressoMachine;
  scale?: Scale;
  filter?: Filter;
  kettle?: Kettle;
}

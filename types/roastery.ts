import z from "zod";
import { Coffee } from "./coffee";

export const RoasterySchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().min(1, "Country is required"),
});

export type RoasteryFormValues = z.infer<typeof RoasterySchema>;

export interface Roastery extends z.infer<typeof RoasterySchema> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoasteryWithCoffee extends Roastery {
  coffees: Coffee[];
}

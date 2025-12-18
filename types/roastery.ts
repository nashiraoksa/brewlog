// export interface Roastery {
//   id: string;
//   name: string;
//   address: string;
//   city: string;
//   country: string;
//   userId: string;
//   createdAt: string;
//   updatedAt: string;
// }

import z from "zod";

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

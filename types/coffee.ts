import z from "zod";

export const CoffeeSchema = z.object({
  roastery: z.string().min(1, "Roastery is required"),
  country: z.string().min(1, "Country is required"),
  name: z.string().min(1, "Name is required"),

  roast_level: z.enum(["LIGHT", "MEDIUM", "MEDIUM_DARK", "DARK"]),
  roast_date: z.date().optional(),

  weight: z.coerce.number().positive("Weight must be positive"),

  price: z.preprocess(
    (v) => (v === "" ? undefined : Number(v)),
    z.number().positive().optional()
  ),

  flavor_profile: z.string().optional(),
});

export type CoffeeFormValues = z.infer<typeof CoffeeSchema>;

// export interface CoffeeUpdatePayload extends z.infer<typeof CoffeeSchema> {
//   id: string;
// }

// export interface Coffee extends z.infer<typeof CoffeeSchema> {
//   id: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// types/coffee.ts
export interface Coffee {
  id: string;
  roastery: string;
  country: string;
  name: string;
  roast_level: "LIGHT" | "MEDIUM" | "MEDIUM_DARK" | "DARK";
  roast_date?: string;
  weight: number;
  price?: number;

  // API-friendly
  flavor_profile?: string[];
}

export interface CoffeeUpdatePayload extends Coffee {
  id: string;
}

export interface CoffeeWithRoastery extends Coffee {
  roasteryRef: {
    id: string;
    name: string;
  };
}

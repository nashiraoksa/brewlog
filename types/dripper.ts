import z from "zod";

export const DripperSchema = z.object({
  name: z.string().min(1, "Name is required"),
  material: z.enum([
    "CERAMIC",
    "GLASS",
    "PLASTIC",
    "STAINLESS",
    "COPPER",
    "IMMERSION",
    "OTHER",
  ]),
  type: z.enum([
    "CONE",
    "FLATBOTTOM",
    "WEDGE",
    "HYBRID",
    "NOBYPASS",
    "IMMERSION",
    "OTHER",
  ]),
  details: z.string().optional(),
  purchase_date: z.coerce.date().optional(),
});

export type DripperFormValues = z.infer<typeof DripperSchema>;

export interface DripperUpdatePayload extends z.infer<typeof DripperSchema> {
  id: string;
}

export interface Dripper extends z.infer<typeof DripperSchema> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export const DRIPPER_TYPES = [
  "CONE",
  "FLATBOTTOM",
  "WEDGE",
  "HYBRID",
  "NOBYPASS",
  "IMMERSION",
  "OTHER",
] as const;

export const DRIPPER_MATERIALS = [
  "CERAMIC",
  "GLASS",
  "PLASTIC",
  "STAINLESS",
  "COPPER",
  "WOOD",
  "OTHER",
] as const;

export type DripperType = (typeof DRIPPER_TYPES)[number];
export type DripperMaterial = (typeof DRIPPER_MATERIALS)[number];

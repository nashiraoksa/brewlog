import z from "zod";

export const FilterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  material: z.enum([
    "PAPER",
    "UNBLEACHEDPAPER",
    "CLOTH",
    "PLASTIC",
    "METAL",
    "OTHER",
  ]),
  type: z.enum(["CONE", "FLATCONE", "DISK", "WAVY", "BASKET", "SACK", "OTHER"]),
  details: z.string().optional(),
  purchase_date: z.coerce.date().optional(),
});

export type FilterFormValues = z.infer<typeof FilterSchema>;

export interface FilterUpdatePayload extends z.infer<typeof FilterSchema> {
  id: string;
}

export interface Filter extends z.infer<typeof FilterSchema> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export const FILTER_TYPES = [
  "CONE",
  "FLATCONE",
  "DISK",
  "WAVY",
  "BASKET",
  "SACK",
  "OTHER",
] as const;

export const FILTER_MATERIALS = [
  "PAPER",
  "UNBLEACHEDPAPER",
  "CLOTH",
  "PLASTIC",
  "METAL",
  "OTHER",
] as const;

export type FilterType = (typeof FILTER_TYPES)[number];
export type FilterMaterial = (typeof FILTER_MATERIALS)[number];

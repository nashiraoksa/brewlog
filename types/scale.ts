import z from "zod";

export const ScaleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  details: z.string().optional(),
  purchase_date: z.coerce.date().optional(),
});

export type ScaleFormValues = z.infer<typeof ScaleSchema>;

export interface ScaleUpdatePayload extends z.infer<typeof ScaleSchema> {
  id: string;
}

export interface Scale extends z.infer<typeof ScaleSchema> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

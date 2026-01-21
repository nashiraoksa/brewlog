import z from "zod";

export const KettleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["ELECTRIC", "STOVETOP"]),
  details: z.string().optional(),
  purchase_date: z.coerce.date().optional(),
});

export type KettleFormValues = z.infer<typeof KettleSchema>;

export interface KettleUpdatePayload extends z.infer<typeof KettleSchema> {
  id: string;
}

export interface Kettle extends z.infer<typeof KettleSchema> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

import z from "zod";

export const GrinderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["MANUAL", "AUTOMATIC"]),
  details: z.string().optional(),
  purchase_date: z.coerce.date().optional(),
});

export type GrinderFormValues = z.infer<typeof GrinderSchema>;

export interface GrinderUpdatePayload extends z.infer<typeof GrinderSchema> {
  id: string;
}

export interface Grinder extends z.infer<typeof GrinderSchema> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

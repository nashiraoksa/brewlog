import z from "zod";

export const EspressoMachineSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["LEVER", "AUTOMATIC"]),
  details: z.string().optional(),
  purchase_date: z.coerce.date().optional(),
});

export type EspressoMachineFormValues = z.infer<typeof EspressoMachineSchema>;

export interface EspressoMachineUpdatePayload
  extends z.infer<typeof EspressoMachineSchema> {
  id: string;
}

export interface EspressoMachine extends z.infer<typeof EspressoMachineSchema> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

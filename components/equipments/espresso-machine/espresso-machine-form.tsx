"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  EspressoMachine,
  EspressoMachineFormValues,
  EspressoMachineSchema,
} from "@/types/espresso-machine";
import { useCreateEspressoMachine } from "@/hooks/espresso-machine/useCreateEspressoMachine";
import { useUpdateEspressoMachine } from "@/hooks/espresso-machine/useUpdateEspressoMachine";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface EspressoMachineFormProps {
  onSuccess: () => void;
  onClose: () => void;
  mode: "create" | "edit";
  initialData?: EspressoMachine | null;
}

export default function EspressoMachineForm({
  onSuccess,
  onClose,
  mode,
  initialData = null,
}: EspressoMachineFormProps) {
  const createEspressoMachine = useCreateEspressoMachine();
  const updateEspressoMachine = useUpdateEspressoMachine();

  const isEditMode = mode === "edit";

  const defaultFormValues: EspressoMachineFormValues = initialData
    ? {
        name: initialData.name,
        type: initialData.type,
        details: initialData.details ?? "",
        purchase_date: initialData.purchase_date
          ? new Date(initialData.purchase_date)
          : undefined,
      }
    : {
        name: "",
        type: "LEVER",
        details: "",
        purchase_date: undefined,
      };

  const form = useForm<EspressoMachineFormValues>({
    resolver: zodResolver(
      EspressoMachineSchema
    ) as Resolver<EspressoMachineFormValues>,
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (initialData) {
      form.reset(defaultFormValues);
    }
  }, [initialData]);

  const onSubmit = async (values: EspressoMachineFormValues) => {
    try {
      if (isEditMode) {
        if (!initialData?.id) {
          throw new Error("Missing espresso machine ID");
        }

        updateEspressoMachine.mutate(
          { id: initialData.id, ...values },
          {
            onSuccess: () => {
              toast.success("Espresso machine updated");
              onSuccess();
            },
          }
        );
      } else {
        createEspressoMachine.mutate(values, {
          onSuccess: () => {
            toast.success("Espresso machine created");
            form.reset();
            onSuccess();
          },
        });
      }
    } catch (error) {
      console.error("Espresso machine submission failed:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col justify-between p-4"
      >
        <div className="flex flex-col gap-6">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Type <span className="text-red-500">*</span>
                </FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select machine type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="LEVER">Lever</SelectItem>
                    <SelectItem value="AUTOMATIC">Automatic</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Details */}
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Purchase Date */}
          <FormField
            control={form.control}
            name="purchase_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Purchase date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick a date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full space-y-2 p-4">
          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full"
            disabled={
              createEspressoMachine.isPending || updateEspressoMachine.isPending
            }
          >
            {isEditMode
              ? updateEspressoMachine.isPending
                ? "Updating..."
                : "Update"
              : createEspressoMachine.isPending
              ? "Creating..."
              : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

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
import { Grinder, GrinderFormValues, GrinderSchema } from "@/types/grinder";
import { useCreateGrinder } from "@/hooks/grinder/useCreateGrinder";
import { useUpdateGrinder } from "@/hooks/grinder/useUpdateGrinder";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface GrinderFormProps {
  onSuccess: () => void;
  onClose: () => void;
  mode: "create" | "edit";
  initialData?: Grinder | null;
}

export default function GrinderForm({
  onSuccess,
  onClose,
  mode,
  initialData = null,
}: GrinderFormProps) {
  const createGrinder = useCreateGrinder();
  const updateGrinder = useUpdateGrinder();

  const isEditMode = mode === "edit";

  const defaultFormValues: GrinderFormValues = initialData
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
        type: "MANUAL",
        details: "",
        purchase_date: undefined,
      };

  const form = useForm<GrinderFormValues>({
    resolver: zodResolver(GrinderSchema) as Resolver<GrinderFormValues>,
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (initialData) {
      form.reset(defaultFormValues);
    }
  }, [initialData]);

  const onSubmit = async (values: GrinderFormValues) => {
    try {
      if (isEditMode) {
        if (!initialData?.id) {
          throw new Error("Missing grinder ID");
        }

        updateGrinder.mutate(
          { id: initialData.id, ...values },
          {
            onSuccess: () => {
              toast.success("Grinder updated");
              onSuccess();
            },
          }
        );
      } else {
        createGrinder.mutate(values, {
          onSuccess: () => {
            toast.success("Grinder created");
            form.reset();
            onSuccess();
          },
        });
      }
    } catch (error) {
      console.error("Grinder submission failed:", error);
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
                      <SelectValue placeholder="Select grinder type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MANUAL">Manual</SelectItem>
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
              <FormItem className="col-span-2">
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
            disabled={createGrinder.isPending || updateGrinder.isPending}
          >
            {isEditMode
              ? updateGrinder.isPending
                ? "Updating..."
                : "Update"
              : createGrinder.isPending
              ? "Creating..."
              : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

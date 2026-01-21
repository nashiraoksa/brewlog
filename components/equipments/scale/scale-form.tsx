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
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { Scale, ScaleFormValues, ScaleSchema } from "@/types/scale";
import { useCreateScale } from "@/hooks/scale/useCreateScale";
import { useUpdateScale } from "@/hooks/scale/useUpdateScale";

interface ScaleFormProps {
  onSuccess: () => void;
  onClose: () => void;
  mode: "create" | "edit";
  initialData?: Scale | null;
}

export default function ScaleForm({
  onSuccess,
  onClose,
  mode,
  initialData = null,
}: ScaleFormProps) {
  const createScale = useCreateScale();
  const updateScale = useUpdateScale();

  const isEditMode = mode === "edit";

  const defaultFormValues: ScaleFormValues = initialData
    ? {
        name: initialData.name,
        details: initialData.details ?? "",
        purchase_date: initialData.purchase_date
          ? new Date(initialData.purchase_date)
          : undefined,
      }
    : {
        name: "",
        details: "",
        purchase_date: undefined,
      };

  const form = useForm<ScaleFormValues>({
    resolver: zodResolver(ScaleSchema) as Resolver<ScaleFormValues>,
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (initialData) {
      form.reset(defaultFormValues);
    }
  }, [initialData]);

  const onSubmit = async (values: ScaleFormValues) => {
    try {
      if (isEditMode) {
        if (!initialData?.id) throw new Error("Missing scale ID");

        updateScale.mutate(
          { id: initialData.id, ...values },
          {
            onSuccess: () => {
              toast.success("Scale updated");
              onSuccess();
            },
          }
        );
      } else {
        createScale.mutate(values, {
          onSuccess: () => {
            toast.success("Scale created");
            form.reset();
            onSuccess();
          },
        });
      }
    } catch (error) {
      console.error("Scale submission failed:", error);
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
            disabled={createScale.isPending || updateScale.isPending}
          >
            {isEditMode
              ? updateScale.isPending
                ? "Updating..."
                : "Update"
              : createScale.isPending
              ? "Creating..."
              : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

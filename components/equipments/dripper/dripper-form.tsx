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
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { Dripper, DripperFormValues, DripperSchema } from "@/types/dripper";
import { useCreateDripper } from "@/hooks/dripper/useCreateDripper";
import { useUpdateDripper } from "@/hooks/dripper/useUpdateDripper";

interface DripperFormProps {
  onSuccess: () => void;
  onClose: () => void;
  mode: "create" | "edit";
  initialData?: Dripper | null;
}

export default function DripperForm({
  onSuccess,
  onClose,
  mode,
  initialData = null,
}: DripperFormProps) {
  const createDripper = useCreateDripper();
  const updateDripper = useUpdateDripper();

  const isEditMode = mode === "edit";

  const defaultFormValues: DripperFormValues = initialData
    ? {
        name: initialData.name,
        type: initialData.type,
        material: initialData.material,
        details: initialData.details ?? "",
        purchase_date: initialData.purchase_date
          ? new Date(initialData.purchase_date)
          : undefined,
      }
    : {
        name: "",
        type: "CONE",
        material: "CERAMIC",
        details: "",
        purchase_date: undefined,
      };

  const form = useForm<DripperFormValues>({
    resolver: zodResolver(DripperSchema) as Resolver<DripperFormValues>,
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (initialData) {
      form.reset(defaultFormValues);
    }
  }, [initialData]);

  const onSubmit = async (values: DripperFormValues) => {
    try {
      if (isEditMode) {
        if (!initialData?.id) {
          throw new Error("Missing dripper ID");
        }

        updateDripper.mutate(
          { id: initialData.id, ...values },
          {
            onSuccess: () => {
              toast.success("Dripper updated");
              onSuccess();
            },
          }
        );
      } else {
        createDripper.mutate(values, {
          onSuccess: () => {
            toast.success("Dripper created");
            form.reset();
            onSuccess();
          },
        });
      }
    } catch (error) {
      console.error("Dripper submission failed:", error);
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
                      <SelectValue placeholder="Select dripper type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="CONE">Cone</SelectItem>
                    <SelectItem value="FLATBOTTOM">Flat bottom</SelectItem>
                    <SelectItem value="WEDGE">Wedge</SelectItem>
                    <SelectItem value="NOBYPASS">No bypass</SelectItem>
                    <SelectItem value="IMMERSION">Immersion</SelectItem>
                    <SelectItem value="HYBRID">Hybrid</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Material */}
          <FormField
            control={form.control}
            name="material"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Material <span className="text-red-500">*</span>
                </FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="CERAMIC">Ceramic</SelectItem>
                    <SelectItem value="GLASS">Glass</SelectItem>
                    <SelectItem value="PLASTIC">Plastic</SelectItem>
                    <SelectItem value="STAINLESS">Stainless steel</SelectItem>
                    <SelectItem value="COPPER">Copper</SelectItem>
                    <SelectItem value="WOOD">Wood</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
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
            disabled={createDripper.isPending || updateDripper.isPending}
          >
            {isEditMode
              ? updateDripper.isPending
                ? "Updating..."
                : "Update"
              : createDripper.isPending
              ? "Creating..."
              : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

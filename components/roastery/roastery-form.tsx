"use client";

import { useCreateRoastery } from "@/hooks/roastery/useCreateRoastery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
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
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { COUNTRIES } from "@/lib/constants/countries";
import { useUpdateRoastery } from "@/hooks/roastery/useUpdateRoastery";
import { Roastery, RoasteryFormValues, RoasterySchema } from "@/types/roastery";

interface RoasteryFormProps {
  onSuccess: () => void;
  onClose: () => void;
  mode: "create" | "edit";
  initialData?: Roastery | null;
}

export default function RoasteryForm({
  onSuccess,
  onClose,
  mode,
  initialData = null,
}: RoasteryFormProps) {
  const createRoastery = useCreateRoastery();

  const updateRoastery = useUpdateRoastery();

  const isEditMode = mode === "edit";

  const defaultFormValues: RoasteryFormValues = initialData
    ? {
        name: initialData.name,
        address: initialData.address,
        city: initialData.city,
        country: initialData.country,
      }
    : {
        name: "",
        address: "",
        city: "",
        country: "",
      };

  const form = useForm<RoasteryFormValues>({
    resolver: zodResolver(RoasterySchema) as Resolver<RoasteryFormValues>,
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        address: initialData.address ?? "",
        city: initialData.city ?? "",
        country: initialData.country,
      });
    }
  }, [initialData, form]);

  const onSubmit = async (values: RoasteryFormValues) => {
    try {
      if (isEditMode) {
        if (!initialData?.id) {
          throw new Error("Missing roastery ID");
        }

        updateRoastery.mutate(
          {
            id: initialData.id,
            ...values,
          },
          {
            onSuccess: () => {
              onSuccess();
              toast.success("Edit successful!");
            },
          }
        );
      } else {
        createRoastery.mutate(values, {
          onSuccess: () => {
            onSuccess();
            form.reset();
            toast.success("New roastery created!");
          },
        });
      }

      onSuccess();
    } catch (error) {
      console.error(`Submission failed in ${mode} mode:`, error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-4 md:grid grid-cols-2 gap-4"
        >
          {/* Roastery Name (optional) */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Address <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* City */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  City <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Country <span className="text-red-500">*</span>
                </FormLabel>

                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent className="max-h-[180px] w-[var(--radix-select-trigger-width)]">
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={createRoastery.isPending}
            className="w-full mt-4 md:col-span-2"
          >
            {createRoastery.isPending
              ? "Saving..."
              : isEditMode
              ? "Update"
              : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";

import { Coffee, CoffeeFormValues, CoffeeSchema } from "@/types/coffee";
import { useCreateCoffee } from "@/hooks/coffee/useCreateCoffee";
import { useUpdateCoffee } from "@/hooks/coffee/useUpdateCoffee";
import { useGetRoastery } from "@/hooks/roastery/useGetRoastery";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

import { SearchableCombobox } from "../custom-component/SearchableCombobox";
import { countryByCode } from "@/lib/constants/countries";
import { cn } from "@/lib/utils";
import { TimePicker } from "../custom-component/TimePicker";

interface CoffeeFormProps {
  mode: "create" | "edit";
  initialData?: Coffee | null;
  onSuccess: () => void;
  onClose: () => void;
}

export default function CoffeeForm({
  mode,
  initialData = null,
  onSuccess,
}: CoffeeFormProps) {
  const createCoffee = useCreateCoffee();
  const updateCoffee = useUpdateCoffee();
  const { roasteries, isLoading, isError } = useGetRoastery();

  const isEditMode = mode === "edit";

  const [time, setTime] = useState({ minutes: 1, seconds: 30 });

  const defaultValues: CoffeeFormValues = initialData
    ? {
        roastery: initialData.roastery,
        country: initialData.country,
        name: initialData.name,
        altitude: initialData.altitude,
        varietals: initialData.varietals,
        processings: initialData.processings,
        roast_level: initialData.roast_level,
        roast_date: initialData.roast_date
          ? new Date(initialData.roast_date)
          : undefined,
        weight: initialData.weight,
        price: initialData.price ?? 0,
        flavor_profile: initialData.flavor_profile?.join(", ") ?? "",
      }
    : {
        roastery: "",
        country: "",
        name: "",
        altitude: 0,
        varietals: "",
        processings: "",
        roast_level: "LIGHT",
        roast_date: undefined,
        weight: 0,
        price: 0,
        flavor_profile: "",
      };

  const form = useForm<CoffeeFormValues>({
    resolver: zodResolver(CoffeeSchema) as Resolver<CoffeeFormValues>,
    defaultValues,
  });

  useEffect(() => {
    if (initialData) {
      form.reset(defaultValues);
    }
  }, [initialData]);

  const onSubmit = (values: CoffeeFormValues) => {
    const payload = {
      ...values,
      roast_date: values.roast_date
        ? values.roast_date.toISOString().slice(0, 10)
        : undefined,
      flavor_profile: values.flavor_profile
        ? values.flavor_profile.split(",").map((s) => s.trim())
        : [],
    };

    if (isEditMode && initialData?.id) {
      updateCoffee.mutate(
        { id: initialData.id, ...payload },
        {
          onSuccess: () => {
            onSuccess();
            toast.success("Coffee updated!");
          },
        }
      );
    } else {
      createCoffee.mutate(payload, {
        onSuccess: () => {
          form.reset();
          onSuccess();
          toast.success("New coffee created!");
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 md:grid grid-cols-2 gap-4"
      >
        <TimePicker value={time} onChange={setTime} maxMinutes={59} />

        {/* Roastery */}
        <FormField
          control={form.control}
          name="roastery"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                Roastery <span className="text-red-500">*</span>
              </FormLabel>
              <SearchableCombobox
                roasteries={roasteries}
                value={field.value}
                disabled={isLoading || isError}
                onChange={(value) => {
                  field.onChange(value);
                  const selected = roasteries.find((r) => r.id === value);
                  if (selected?.country) {
                    form.setValue("country", selected.country);
                  }
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Country (auto-filled, display name) */}
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Country <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  value={countryByCode.get(field.value) ?? ""}
                  readOnly
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        {/* Altitude */}
        <FormField
          control={form.control}
          name="altitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Altitude</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Varietals */}
        <FormField
          control={form.control}
          name="varietals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Varietals</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Processing */}
        <FormField
          control={form.control}
          name="processings"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Processings</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Roast level */}
        <FormField
          control={form.control}
          name="roast_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Roast Level <span className="text-red-500">*</span>
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["LIGHT", "MEDIUM", "MEDIUM_DARK", "DARK"].map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        {/* Weight */}
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Weight (g) <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Roast date */}
        <FormField
          control={form.control}
          name="roast_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Roast Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full justify-start",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Flavor profile */}
        <FormField
          control={form.control}
          name="flavor_profile"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Flavor Profile</FormLabel>
              <FormControl>
                <Input {...field} placeholder="chocolate, citrus, nutty" />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="sticky bottom-0 bg-background pt-4 md:col-span-2">
          <Button
            type="submit"
            className="w-full"
            disabled={createCoffee.isPending}
          >
            {isEditMode ? "Update Coffee" : "Create Coffee"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

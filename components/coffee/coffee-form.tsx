"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { useCreateCoffee } from "@/hooks/coffee/useCreateCoffee";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

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
import { toast } from "sonner";
import { useGetRoastery } from "@/hooks/roastery/useGetRoastery";
import { SearchableCombobox } from "../custom-component/SearchableCombobox";

// -------------------------
//     ZOD SCHEMA
// -------------------------

const CoffeeSchema = z.object({
  roastery: z.string().min(1, "Roastery is required"),
  country: z.string().min(1, "Country is required"),
  name: z.string().min(1, "Name is required"),

  roast_level: z.enum(["LIGHT", "MEDIUM", "MEDIUM_DARK", "DARK"]),

  // optional date from datepicker
  roast_date: z.date().optional(),

  // required number, must be positive
  weight: z.coerce.number().positive("Weight must be positive"),

  // optional number from number input
  price: z.preprocess((value) => {
    if (value === "" || value === null || value === undefined) {
      return undefined;
    }

    const num = typeof value === "number" ? value : Number(value);

    if (Number.isNaN(num)) {
      return undefined;
    }

    return num;
  }, z.number().positive("Price must be positive").optional()),

  // optional string with default
  flavor_profile: z.string().optional().default(""),
});

type CoffeeFormValues = z.infer<typeof CoffeeSchema>;

// -------------------------
//     COMPONENT
// -------------------------

export default function CoffeeForm() {
  const createCoffee = useCreateCoffee();
  const [open, setOpen] = useState(false);

  const { roasteries, isLoading, isError } = useGetRoastery();

  const form = useForm<CoffeeFormValues>({
    resolver: zodResolver(CoffeeSchema) as Resolver<CoffeeFormValues>,
    defaultValues: {
      roastery: "",
      country: "",
      name: "",
      roast_level: "LIGHT",
      roast_date: new Date(),
      weight: 0,
      price: 0,
      flavor_profile: "",
    },
  });

  function onSubmit(values: CoffeeFormValues) {
    const flavorArray = values.flavor_profile
      ? values.flavor_profile.split(",").map((s) => s.trim())
      : [];

    createCoffee.mutate(
      {
        ...values,
        roast_date: values.roast_date
          ? values.roast_date.toISOString().slice(0, 10)
          : "",
        flavor_profile: flavorArray,
      },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset();
          toast.success("New coffee created!");
        },
      }
    );
  }

  return (
    <div className="flex justify-end mb-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add Coffee</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg max-h-3/4 md:max-h-full overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Coffee</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4 md:grid grid-cols-2 gap-4"
            >
              {/* Roastery (required) */}
              {/* <FormField
                control={form.control}
                name="roastery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Roastery <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              {/* <FormField
                control={form.control}
                name="roastery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Roastery <span className="text-red-500">*</span>
                    </FormLabel>

                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);

                        // optional: auto set country
                        const selected = roasteries.find((r) => r.id === value);
                        if (selected?.country) {
                          form.setValue("country", selected.country, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                        }
                      }}
                      disabled={isLoading || isError || roasteries.length === 0}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={
                              isLoading
                                ? "Loading roasteries..."
                                : isError
                                ? "Failed to load roasteries"
                                : "Select roastery"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {roasteries.map((roastery) => (
                          <SelectItem key={roastery.id} value={roastery.id}>
                            {roastery.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              {/* Roastery - searchable */}
              <FormField
                control={form.control}
                name="roastery"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      Roastery <span className="text-red-500">*</span>
                    </FormLabel>

                    <SearchableCombobox
                      width="100%"
                      roasteries={roasteries}
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);

                        // optional auto fill country
                        const selected = roasteries.find((r) => r.id === value);
                        if (selected?.country) {
                          form.setValue("country", selected.country, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                        }
                      }}
                      disabled={isLoading || isError || roasteries.length === 0}
                      placeholder={
                        isLoading
                          ? "Loading roasteries..."
                          : isError
                          ? "Failed to load roasteries"
                          : "Select roastery"
                      }
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Country (required) */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Country <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Name (required) */}
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

              {/* Roast Level (required) */}
              <FormField
                control={form.control}
                name="roast_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Roast Level <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select roast level" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="LIGHT">LIGHT</SelectItem>
                          <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                          <SelectItem value="MEDIUM_DARK">
                            MEDIUM_DARK
                          </SelectItem>
                          <SelectItem value="DARK">DARK</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Roast Date (optional, shadcn datepicker) */}
              <FormField
                control={form.control}
                name="roast_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Roast Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Weight (required) */}
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Weight (grams) <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price (optional) */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Flavor Profile (optional) */}
              <FormField
                control={form.control}
                name="flavor_profile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Flavor Profile (comma separated)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="col-span-2">
                <Button type="submit" disabled={createCoffee.isPending}>
                  {createCoffee.isPending ? "Saving..." : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

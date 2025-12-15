"use client";

import { useCreateRoastery } from "@/hooks/roastery/useCreateRoastery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import z from "zod";

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
import { SearchableCombobox } from "../custom-component/SearchableCombobox";

const RoasterySchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().min(1, "Country is required"),
});

type RoasteryFormValues = z.infer<typeof RoasterySchema>;

export default function RoasteryForm() {
  const createRoastery = useCreateRoastery();
  const [open, setOpen] = useState(false);

  const form = useForm<RoasteryFormValues>({
    resolver: zodResolver(RoasterySchema) as Resolver<RoasteryFormValues>,
    defaultValues: {
      name: "",
      address: "",
      city: "",
      country: "",
    },
  });

  function onSubmit(values: RoasteryFormValues) {
    createRoastery.mutate(
      {
        ...values,
      },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset();
          toast.success("New roastery created!");
        },
      }
    );
  }

  return (
    <div className="flex justify-end mb-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add Roastery</Button>
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

                      <SelectContent className="w-full md:w-[220px] max-h-[180px]">
                        {COUNTRIES.map((country) => (
                          <SelectItem key={country.code} value={country.name}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="col-span-2">
                <Button type="submit" disabled={createRoastery.isPending}>
                  {createRoastery.isPending ? "Saving..." : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

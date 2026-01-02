"use client";

import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Brew, BrewFormValues, BrewSchema } from "@/types/brew";
import { useCreateBrew } from "@/hooks/brew/useCreateBrew";

interface BrewFormProps {
  onSuccess: () => void;
  onClose: () => void;
  mode: "create" | "edit";
  initialData?: Brew | null;
}

export default function BrewForm({
  onSuccess,
  onClose,
  mode,
  initialData = null,
}: BrewFormProps) {
  const createBrew = useCreateBrew();

  const isEditMode = mode === "edit";

  const defaultFormValues: BrewFormValues = initialData
    ? {
        ...initialData,
      }
    : {
        date: null,
        method: "",
        grindSetting: "",
        coffeeAmount: 0,
        waterAmount: 0,
        waterTemperature: 0,
        temperatureMetric: "C",
        brewMinutes: 0,
        brewSeconds: 0,
        aroma: 0,
        sweetness: 0,
        acidity: 0,
        bitterness: 0,
        body: 0,
        overall: 0,
        notes: "",
        grinderId: null,
        dripperId: null,
        espressoMachineId: null,
        filterId: null,
        kettleId: null,
        scaleId: null,
        steps: [],
      };

  const form = useForm<BrewFormValues>({
    resolver: zodResolver(BrewSchema) as Resolver<BrewFormValues>,
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const onSubmit = async (values: BrewFormValues) => {
    console.log("SUBMIT VALUES:", values);

    try {
      if (isEditMode) {
        toast.info("Edit mode not wired yet 🙂");
      } else {
        createBrew.mutate(values, {
          onSuccess: () => {
            onSuccess();
            form.reset();
            toast.success("New roastery created!");
          },
        });
      }
    } catch (error) {
      console.error("Failed to submit brew:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            (values) => {
              console.log("RHF SUBMIT OK", values);
              onSubmit(values);
            },
            (errors) => {
              console.log("RHF VALIDATION FAILED", errors);
            }
          )}
          className="space-y-4 mt-4 md:grid grid-cols-2 gap-4"
        >
          {/* Method */}
          <FormField
            control={form.control}
            name="method"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Method <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {[
            { name: "grinderId", label: "Grinder" },
            { name: "dripperId", label: "Dripper" },
            { name: "espressoMachineId", label: "Espresso Machine" },
            { name: "filterId", label: "Filter" },
            { name: "kettleId", label: "Kettle" },
            { name: "scaleId", label: "Scale" },
          ].map(({ name, label }) => (
            <FormField
              key={name}
              control={form.control}
              name={name as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value || null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {/* Coffee Amount */}
          <FormField
            control={form.control}
            name="coffeeAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coffee (g)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Water Amount */}
          <FormField
            control={form.control}
            name="waterAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Water (ml)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Temperature */}
          <FormField
            control={form.control}
            name="waterTemperature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temperature</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value || null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Grind Setting */}
          <FormField
            control={form.control}
            name="grindSetting"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grind Setting</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Temperature Metric */}
          <FormField
            control={form.control}
            name="temperatureMetric"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temperature Metric</FormLabel>
                <FormControl>
                  <select
                    className="border rounded px-2 py-1 w-full"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    <option value="C">C</option>
                    <option value="F">F</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Minutes */}
          <FormField
            control={form.control}
            name="brewMinutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minutes</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Seconds */}
          <FormField
            control={form.control}
            name="brewSeconds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seconds</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="md:col-span-2 space-y-2">
            <FormLabel>Steps</FormLabel>

            {form.watch("steps").map((step, index) => (
              <div key={index} className="grid grid-cols-4 gap-2">
                <Input
                  placeholder="Order"
                  type="number"
                  value={step.order}
                  onChange={(e) =>
                    form.setValue(`steps.${index}.order`, +e.target.value)
                  }
                />
                <Input
                  placeholder="Session"
                  value={step.session}
                  onChange={(e) =>
                    form.setValue(`steps.${index}.session`, e.target.value)
                  }
                />
                <Input
                  placeholder="Water"
                  type="number"
                  value={step.water}
                  onChange={(e) =>
                    form.setValue(`steps.${index}.water`, +e.target.value)
                  }
                />
                <Input
                  placeholder="Time (s)"
                  type="number"
                  value={step.time}
                  onChange={(e) =>
                    form.setValue(`steps.${index}.time`, +e.target.value)
                  }
                />
              </div>
            ))}

            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                form.setValue("steps", [
                  ...form.getValues("steps"),
                  {
                    order: form.getValues("steps").length + 1,
                    session: "",
                    water: 0,
                    time: 0,
                  },
                ])
              }
            >
              Add Step
            </Button>
          </div>

          {[
            "aroma",
            "sweetness",
            "acidity",
            "bitterness",
            "body",
            "overall",
          ].map((name) => (
            <FormField
              key={name}
              control={form.control}
              name={name as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {name.charAt(0).toUpperCase() + name.slice(1)} (0–10)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      max={10}
                      value={field.value ?? 0}
                      onChange={(e) => field.onChange(+e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {/* Notes */}
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            // disabled={createBrew.isLoading}
            className="w-full mt-4 md:col-span-2"
          >
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
}

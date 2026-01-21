"use client";

import { useEffect, useState } from "react";
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
import { useGetCoffee } from "@/hooks/coffee/useGetCoffee";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "../ui/select";
import { RoasteryWithCoffee } from "@/types/roastery";
import { useGetGrinder } from "@/hooks/grinder/useGetGrinder";
import { useGetDripper } from "@/hooks/dripper/useGetDripper";
import { useGetKettle } from "@/hooks/kettle/useGetKettle";
import { useGetEspressoMachine } from "@/hooks/espresso-machine/useGetEspressoMachine";
import { useGetFilter } from "@/hooks/filter/useGetFilter";
import { useGetScale } from "@/hooks/scale/useGetScale";
import { PlusIcon, Trash2, Star } from "lucide-react";
import { Label } from "../ui/label";
import { METHODS } from "@/lib/constants/methods";
import { Slider } from "@/components/ui/slider";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useUpdateBrew } from "@/hooks/brew/useUpdateBrew";
import { TimePicker } from "../custom-component/TimePicker";

interface BrewFormProps {
  onSuccess: () => void;
  onClose: () => void;
  mode: "create" | "edit";
  initialData?: Brew | null;
}

type EquipmentFieldName =
  | "grinderId"
  | "dripperId"
  | "espressoMachineId"
  | "filterId"
  | "kettleId"
  | "scaleId";

type EquipmentField = {
  name: EquipmentFieldName;
  label: string;
  placeholder: string;
  options: { id: string; name: string }[];
  required?: boolean;
};

export default function BrewForm({
  onSuccess,
  onClose,
  mode,
  initialData = null,
}: BrewFormProps) {
  const createBrew = useCreateBrew();
  const updateBrew = useUpdateBrew();

  const isEditMode = mode === "edit";

  const [step, setStep] = useState(1);
  const TOTAL_STEPS = 5;

  const { coffees } = useGetCoffee("card");
  const { grinders } = useGetGrinder();
  const { drippers } = useGetDripper();
  const { kettles } = useGetKettle();
  const { espressoMachines } = useGetEspressoMachine();
  const { filters } = useGetFilter();
  const { scales } = useGetScale();

  const defaultFormValues: BrewFormValues = initialData
    ? { ...initialData }
    : {
        date: undefined,
        coffeeId: null,
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
    if (initialData) form.reset(initialData);
  }, [initialData, form]);

  const onSubmit = async (values: BrewFormValues) => {
    try {
      if (isEditMode) {
        if (!initialData?.id) {
          throw new Error("Missing brew ID");
        }

        updateBrew.mutate(
          { id: initialData.id, ...values },
          {
            onSuccess: () => {
              toast.success("Brew updated!");
              onSuccess();
            },
          }
        );
      } else {
        createBrew.mutate(values, {
          onSuccess: () => {
            onSuccess();
            form.reset();
            toast.success("New brew created!");
          },
        });
      }
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const equipmentFields: EquipmentField[] = [
    {
      name: "grinderId",
      label: "Grinder",
      placeholder: "Select grinder",
      options: grinders,
    },
    {
      name: "dripperId",
      label: "Dripper",
      placeholder: "Select dripper",
      options: drippers,
    },
    {
      name: "espressoMachineId",
      label: "Espresso Machine",
      placeholder: "Select espresso machine",
      options: espressoMachines,
    },
    {
      name: "filterId",
      label: "Filter",
      placeholder: "Select filter",
      options: filters,
    },
    {
      name: "kettleId",
      label: "Kettle",
      placeholder: "Select kettle",
      options: kettles,
    },
    {
      name: "scaleId",
      label: "Scale",
      placeholder: "Select scale",
      options: scales,
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
        className="h-full flex flex-col justify-between"
      >
        <div className="space-y-6">
          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <div className="grid md:grid-cols-1 gap-4">
              <h3 className="md:col-span-1 font-semibold">Method</h3>

              <FormField
                control={form.control}
                name="method"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Method <span className="text-red-500">*</span>
                    </FormLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent className="max-h-[220px] w-[var(--radix-select-trigger-width)]">
                        {METHODS.map((method) => (
                          <SelectItem
                            key={method.id}
                            value={method.id.toString()}
                          >
                            {method.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coffeeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Coffee <span className="text-red-500">*</span>
                    </FormLabel>

                    <Select
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select coffee" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent className="max-h-[250px] w-[var(--radix-select-trigger-width)]">
                        {coffees.map((roastery: RoasteryWithCoffee) => (
                          <SelectGroup key={roastery.id} className="mb-3">
                            <SelectLabel>{roastery.name}</SelectLabel>
                            {roastery.coffees.map((coffee) => (
                              <SelectItem
                                key={coffee.id}
                                value={coffee.id.toString()}
                              >
                                {coffee.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Brew Date</FormLabel>
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
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <div className="grid md:grid-cols-1 gap-4">
              <h3 className="md:col-span-1 font-semibold">Equipment</h3>

              {equipmentFields.map(
                ({ name, label, placeholder, options, required }) => {
                  const isEmpty = options.length === 0;

                  return (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {label}
                            {required && (
                              <span className="text-red-500"> *</span>
                            )}
                          </FormLabel>

                          <Select
                            value={field.value ?? ""}
                            onValueChange={field.onChange}
                            disabled={isEmpty}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue
                                  placeholder={
                                    isEmpty
                                      ? `No ${label.toLowerCase()} available`
                                      : placeholder
                                  }
                                />
                              </SelectTrigger>
                            </FormControl>

                            <SelectContent className="max-h-[250px] w-[var(--radix-select-trigger-width)]">
                              {isEmpty ? (
                                <SelectItem value="__empty" disabled>
                                  No options available
                                </SelectItem>
                              ) : (
                                options.map((item) => (
                                  <SelectItem key={item.id} value={item.id}>
                                    {item.name}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                }
              )}
            </div>
          )}

          {/* ================= STEP 3 ================= */}
          {step === 3 && (
            <div className="grid md:grid-cols-2 gap-4">
              <h3 className="md:col-span-2 font-semibold">Brew Recipe</h3>

              <FormField
                control={form.control}
                name="grindSetting"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Grind Setting</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ""} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coffeeAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Coffee (g) <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="waterAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Water (ml) <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="waterTemperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Water Temperature</FormLabel>
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

              <FormField
                control={form.control}
                name="temperatureMetric"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Metric</FormLabel>

                    <Select
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select metric" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent className="max-h-[250px] w-[var(--radix-select-trigger-width)]">
                        {[
                          { label: "Celcius", value: "C" },
                          { label: "Fahrenheit", value: "F" },
                        ].map((metric) => (
                          <SelectItem key={metric.value} value={metric.value}>
                            {metric.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
            </div>
          )}

          {/* ================= STEP 4 ================= */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Brew Process</h3>

              {form.watch("steps").map((stepItem, index) => (
                <div key={index} className="grid grid-cols-3 gap-2">
                  <div className="col-span-3 flex items-center justify-between">
                    <span className="font-medium">Step {stepItem.order}</span>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => {
                        const updated = form
                          .getValues("steps")
                          .filter((_, i) => i !== index)
                          .map((s, i) => ({ ...s, order: i + 1 }));
                        form.setValue("steps", updated);
                      }}
                      size="icon-sm"
                    >
                      <Trash2 className="w-4" />
                    </Button>
                  </div>
                  <Input
                    type="number"
                    value={stepItem.order}
                    onChange={(e) =>
                      form.setValue(`steps.${index}.order`, +e.target.value)
                    }
                    disabled
                    className="hidden"
                  />
                  <div className="col-span-3 space-y-2">
                    <Label>Session Name</Label>
                    <Input
                      value={stepItem.session}
                      onChange={(e) =>
                        form.setValue(`steps.${index}.session`, e.target.value)
                      }
                      placeholder="Blooming / first pour / etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Water (ml)</Label>
                    <Input
                      type="number"
                      value={stepItem.water}
                      onChange={(e) =>
                        form.setValue(`steps.${index}.water`, +e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    {/* <Label>Time (s)</Label> */}
                    {/* <Input
                      type="number"
                      value={stepItem.time}
                      onChange={(e) =>
                        form.setValue(`steps.${index}.time`, +e.target.value)
                      }
                    /> */}

                    <TimePicker
                      value={{
                        minutes: Math.floor(stepItem.time / 60),
                        seconds: stepItem.time % 60,
                      }}
                      onChange={(v) => {
                        form.setValue(
                          `steps.${index}.time`,
                          Number(v.minutes * 60 + v.seconds)
                        );
                        // setTime(v);
                        // updateStep(
                        //   index,
                        //   "time",
                        //   Number(v.minutes * 60 + v.seconds)
                        // );
                      }}
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="default"
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
                size="sm"
              >
                <PlusIcon className="w-4" /> Add Step
              </Button>
            </div>
          )}

          {/* ================= STEP 5 ================= */}
          {step === 5 && (
            <div className="grid md:grid-cols-1 gap-8">
              <h3 className="md:col-span-1 font-semibold">Rating</h3>

              <div className="space-y-6">
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
                          {name.charAt(0).toUpperCase() + name.slice(1)}
                          <Star className="w-4" />({field.value ?? 0} / 10)
                        </FormLabel>
                        <FormControl>
                          <div
                            onPointerDown={(e) => e.preventDefault()}
                            onMouseDown={(e) => e.preventDefault()}
                            onFocusCapture={(e) => e.preventDefault()}
                          >
                            <Slider
                              tabIndex={-1}
                              min={0}
                              max={10}
                              step={1}
                              value={[field.value ?? 0]}
                              onValueChange={(value) =>
                                field.onChange(value[0])
                              }
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="md:col-span-1">
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ""} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        {/* NAVIGATION */}
        <div className="flex items-center justify-between py-6 mt-8">
          <Button
            type="button"
            variant="outline"
            disabled={step === 1}
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </Button>

          <div className="text-sm text-muted-foreground">
            {step} / {TOTAL_STEPS}
          </div>

          {step < TOTAL_STEPS ? (
            <Button
              key="next"
              variant="outline"
              type="button"
              onClick={() => setStep((s) => s + 1)}
            >
              Next
            </Button>
          ) : (
            <Button key="submit" variant="default" type="submit">
              Create
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

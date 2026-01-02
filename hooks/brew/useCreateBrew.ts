"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Brew } from "@/types/brew";

export type StepInput = {
  order: number;
  session: string;
  water: number;
  time: number;
};

export type BrewInput = {
  date?: string | null;
  method: string;
  grindSetting?: string | null;

  coffeeAmount: number;
  waterAmount: number;
  waterTemperature: number;
  temperatureMetric: string;

  brewMinutes: number;
  brewSeconds: number;

  aroma: number;
  sweetness: number;
  acidity: number;
  bitterness: number;
  body: number;
  overall: number;

  notes?: string | null;

  grinderId?: string | null;
  dripperId?: string | null;
  espressoMachineId?: string | null;
  filterId?: string | null;
  kettleId?: string | null;
  scaleId?: string | null;

  steps: StepInput[];
};

export function useCreateBrew() {
  const queryClient = useQueryClient();

  return useMutation<Brew, Error, BrewInput>({
    mutationFn: async (data: BrewInput) => {
      const res = await fetch("/api/brew", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create brew");
      }

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brew"] });
      queryClient.invalidateQueries({ queryKey: ["brews"] });
    },
  });
}

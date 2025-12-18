"use client";

import { EspressoMachineFormValues } from "@/types/espresso-machine";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateEspressoMachine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EspressoMachineFormValues) => {
      const res = await fetch("/api/espresso-machine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create espresso machine");
      }

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["espresso-machine"] });
    },
  });
}

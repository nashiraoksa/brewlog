"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EspressoMachineUpdatePayload } from "@/types/espresso-machine";

export function useUpdateEspressoMachine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: EspressoMachineUpdatePayload) => {
      const res = await fetch(`/api/espresso-machine/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to update espresso machine");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["espresso-machine"] });
    },
  });
}

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CoffeeUpdatePayload } from "@/types/coffee";

export function useUpdateCoffee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: CoffeeUpdatePayload) => {
      const res = await fetch(`/api/coffees/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to update coffee");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coffee"] });
    },
  });
}

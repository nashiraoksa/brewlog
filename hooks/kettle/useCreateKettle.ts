"use client";

import { KettleFormValues } from "@/types/kettle";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateKettle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: KettleFormValues) => {
      const res = await fetch("/api/kettle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create kettle");
      }

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kettle"] });
    },
  });
}

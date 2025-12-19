"use client";

import { FilterFormValues } from "@/types/filter";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateFilter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FilterFormValues) => {
      const res = await fetch("/api/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create filter");
      }

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["filter"] });
    },
  });
}

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FilterUpdatePayload } from "@/types/filter";

export function useUpdateFilter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: FilterUpdatePayload) => {
      const res = await fetch(`/api/filter/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to update filter");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["filter"] });
    },
  });
}

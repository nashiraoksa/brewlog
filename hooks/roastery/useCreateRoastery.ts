"use client";

import { RoasteryFormValues } from "@/types/roastery";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateRoastery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RoasteryFormValues) => {
      const res = await fetch("/api/roastery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create roastery");
      }

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roastery"] });
    },
  });
}

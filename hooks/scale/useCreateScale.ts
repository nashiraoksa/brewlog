"use client";

import { ScaleFormValues } from "@/types/scale";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateScale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ScaleFormValues) => {
      const res = await fetch("/api/scale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create scale");
      }

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scale"] });
    },
  });
}

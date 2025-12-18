"use client";

import { GrinderFormValues } from "@/types/grinder";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateGrinder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: GrinderFormValues) => {
      const res = await fetch("/api/grinder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create grinder");
      }

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grinder"] });
    },
  });
}

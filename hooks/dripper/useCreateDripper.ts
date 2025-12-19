"use client";

import { DripperFormValues } from "@/types/dripper";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateDripper() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: DripperFormValues) => {
      const res = await fetch("/api/dripper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create dripper");
      }

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dripper"] });
    },
  });
}

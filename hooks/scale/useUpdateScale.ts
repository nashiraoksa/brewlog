"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ScaleUpdatePayload } from "@/types/scale";

export function useUpdateScale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: ScaleUpdatePayload) => {
      const res = await fetch(`/api/scale/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to update scale");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scale"] });
    },
  });
}

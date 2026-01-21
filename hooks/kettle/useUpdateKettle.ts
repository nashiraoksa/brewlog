"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KettleUpdatePayload } from "@/types/kettle";

export function useUpdateKettle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: KettleUpdatePayload) => {
      const res = await fetch(`/api/kettle/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to update kettle");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kettle"] });
    },
  });
}

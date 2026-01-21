"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GrinderUpdatePayload } from "@/types/grinder";

export function useUpdateGrinder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: GrinderUpdatePayload) => {
      const res = await fetch(`/api/grinder/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to update grinder");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grinder"] });
    },
  });
}

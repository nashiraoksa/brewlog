"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DripperUpdatePayload } from "@/types/dripper";

export function useUpdateDripper() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: DripperUpdatePayload) => {
      const res = await fetch(`/api/dripper/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to update dripper");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dripper"] });
    },
  });
}

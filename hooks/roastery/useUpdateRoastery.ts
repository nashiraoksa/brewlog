"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateRoasteryPayload {
  id: string;
  name: string;
  address?: string;
  city?: string;
  country: string;
}

export function useUpdateRoastery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateRoasteryPayload) => {
      const res = await fetch(`/api/roastery/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to update roastery");
      }

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roastery"] });
    },
  });
}

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateBrew() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: any) => {
      const res = await fetch(`/api/brew/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to update brew");
      }

      return res.json();
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["brews"] });
      queryClient.invalidateQueries({ queryKey: ["brew"] });
    },
  });
}

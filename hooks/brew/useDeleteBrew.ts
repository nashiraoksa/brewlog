"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteBrew() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/brew/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to delete brew");
      }

      return res.json();
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["brews"] });
      queryClient.invalidateQueries({ queryKey: ["brew"] });
    },
  });
}

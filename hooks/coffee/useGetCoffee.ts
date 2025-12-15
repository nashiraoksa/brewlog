"use client";

import { useQuery } from "@tanstack/react-query";

export function useGetCoffee() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["coffees"],
    queryFn: async () => {
      const res = await fetch("/api/coffees/user");
      if (!res.ok) throw new Error("Failed to fetch coffees");
      return res.json();
    },
  });

  return { data, isLoading, error };
}

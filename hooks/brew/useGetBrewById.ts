"use client";

import { useQuery } from "@tanstack/react-query";
import { BrewWithCoffee } from "@/types/brew";

async function fetchBrewById(id: string): Promise<BrewWithCoffee> {
  const res = await fetch(`/api/brew/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch brew");
  }

  return res.json();
}

export function useGetBrewById(id?: string) {
  const { data, isLoading, isError, error } = useQuery<BrewWithCoffee>({
    queryKey: ["brew", id],
    queryFn: () => fetchBrewById(id as string),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  return {
    brew: data ?? null,
    isLoading,
    isError,
    error: error as Error | null,
  };
}

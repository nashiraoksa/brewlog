"use client";

import { useQuery } from "@tanstack/react-query";
import { BrewWithCoffee } from "@/types/brew";

async function fetchBrew(): Promise<BrewWithCoffee[]> {
  const res = await fetch("/api/brew/user");

  if (!res.ok) {
    throw new Error("Failed to fetch brew");
  }

  return res.json();
}

export function useGetBrew() {
  const { data, isLoading, isError, error } = useQuery<BrewWithCoffee[]>({
    queryKey: ["brew"],
    queryFn: fetchBrew,
    staleTime: 5 * 60 * 1000,
  });

  return {
    brews: data ?? [],
    isLoading,
    isError,
    error: error as Error | null,
  };
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { Grinder } from "@/types/grinder";

async function fetchGrinder(): Promise<Grinder[]> {
  const res = await fetch("/api/grinder/user");

  if (!res.ok) {
    throw new Error("Failed to fetch grinder");
  }

  return res.json();
}

export function useGetGrinder() {
  const { data, isLoading, isError, error } = useQuery<Grinder[]>({
    queryKey: ["grinder"],
    queryFn: fetchGrinder,
    staleTime: 5 * 60 * 1000,
  });

  return {
    grinders: data ?? [],
    isLoading,
    isError,
    error: error as Error | null,
  };
}

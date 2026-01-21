"use client";

import { useQuery } from "@tanstack/react-query";
import { Scale } from "@/types/scale";

async function fetchScale(): Promise<Scale[]> {
  const res = await fetch("/api/scale/user");

  if (!res.ok) {
    throw new Error("Failed to fetch scale");
  }

  return res.json();
}

export function useGetScale() {
  const { data, isLoading, isError, error } = useQuery<Scale[]>({
    queryKey: ["scale"],
    queryFn: fetchScale,
    staleTime: 5 * 60 * 1000,
  });

  return {
    scales: data ?? [],
    isLoading,
    isError,
    error: error as Error | null,
  };
}

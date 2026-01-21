"use client";

import { useQuery } from "@tanstack/react-query";
import { Filter } from "@/types/filter";

async function fetchFilter(): Promise<Filter[]> {
  const res = await fetch("/api/filter/user");

  if (!res.ok) {
    throw new Error("Failed to fetch filter");
  }

  return res.json();
}

export function useGetFilter() {
  const { data, isLoading, isError, error } = useQuery<Filter[]>({
    queryKey: ["filter"],
    queryFn: fetchFilter,
    staleTime: 5 * 60 * 1000,
  });

  return {
    filters: data ?? [],
    isLoading,
    isError,
    error: error as Error | null,
  };
}

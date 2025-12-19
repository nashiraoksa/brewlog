"use client";

import { useQuery } from "@tanstack/react-query";
import { Kettle } from "@/types/kettle";

async function fetchKettle(): Promise<Kettle[]> {
  const res = await fetch("/api/kettle/user");

  if (!res.ok) {
    throw new Error("Failed to fetch kettle");
  }

  return res.json();
}

export function useGetKettle() {
  const { data, isLoading, isError, error } = useQuery<Kettle[]>({
    queryKey: ["kettle"],
    queryFn: fetchKettle,
    staleTime: 5 * 60 * 1000,
  });

  return {
    kettles: data ?? [],
    isLoading,
    isError,
    error: error as Error | null,
  };
}

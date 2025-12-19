"use client";

import { useQuery } from "@tanstack/react-query";
import { Dripper } from "@/types/dripper";

async function fetchDripper(): Promise<Dripper[]> {
  const res = await fetch("/api/dripper/user");

  if (!res.ok) {
    throw new Error("Failed to fetch dripper");
  }

  return res.json();
}

export function useGetDripper() {
  const { data, isLoading, isError, error } = useQuery<Dripper[]>({
    queryKey: ["dripper"],
    queryFn: fetchDripper,
    staleTime: 5 * 60 * 1000,
  });

  return {
    drippers: data ?? [],
    isLoading,
    isError,
    error: error as Error | null,
  };
}

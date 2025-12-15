"use client";

import { useQuery } from "@tanstack/react-query";
import { Roastery } from "@/types/roastery";

// interface Roastery {
//   id: string;
//   name: string;
//   country: string;
// }

async function fetchRoastery(): Promise<Roastery[]> {
  const res = await fetch("/api/roastery/user");

  if (!res.ok) {
    throw new Error("Failed to fetch roastery");
  }

  return res.json();
}

export function useGetRoastery() {
  const { data, isLoading, isError, error } = useQuery<Roastery[]>({
    queryKey: ["roastery"],
    queryFn: fetchRoastery,
    staleTime: 5 * 60 * 1000, // optional, biar tidak ke-fetch terus
  });

  // bisa wrap sedikit supaya yang dipakai di component jelas
  return {
    roasteries: data ?? [],
    isLoading,
    isError,
    error: error as Error | null,
  };
}

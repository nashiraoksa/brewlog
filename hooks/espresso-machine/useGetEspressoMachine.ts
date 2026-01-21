"use client";

import { useQuery } from "@tanstack/react-query";
import { EspressoMachine } from "@/types/espresso-machine";

async function fetchEspressoMachine(): Promise<EspressoMachine[]> {
  const res = await fetch("/api/espresso-machine/user");

  if (!res.ok) {
    throw new Error("Failed to fetch espresso machine");
  }

  return res.json();
}

export function useGetEspressoMachine() {
  const { data, isLoading, isError, error } = useQuery<EspressoMachine[]>({
    queryKey: ["espresso-machine"],
    queryFn: fetchEspressoMachine,
    staleTime: 5 * 60 * 1000,
  });

  return {
    espressoMachines: data ?? [],
    isLoading,
    isError,
    error: error as Error | null,
  };
}

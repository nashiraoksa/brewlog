"use client";

import { useQuery } from "@tanstack/react-query";
import { CoffeeWithRoastery } from "@/types/coffee";

// async function fetchCoffee(): Promise<CoffeeWithRoastery[]> {
//   const res = await fetch("/api/coffees/roastery");

//   if (!res.ok) {
//     throw new Error("Failed to fetch coffee");
//   }

//   return res.json();
// }

type CoffeeView = "table" | "card";

async function fetchCoffee(view: CoffeeView) {
  const url = view === "card" ? "/api/coffees/roastery" : "/api/coffees/user";

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch coffee");
  }

  return res.json();
}

export function useGetCoffee(view: CoffeeView) {
  const isCardView = view === "card";

  const query = useQuery({
    queryKey: ["coffee", view], // 🔥 cache per view
    queryFn: () => fetchCoffee(view),
    enabled: !!view, // safe guard
    staleTime: 5 * 60 * 1000,
  });

  return {
    coffees: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as Error | null,
  };
}

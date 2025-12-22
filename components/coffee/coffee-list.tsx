"use client";

import { fetchCoffee, useGetCoffee } from "@/hooks/coffee/useGetCoffee";
import { DataTable } from "./table/data-table";
import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { ToggleButton } from "../custom-component/ToggleButton";
import { AnimatePresence, motion } from "framer-motion";
import DataCard from "./card/data-card";
import SearchInput from "../custom-component/SearchInput";
import { useSearch } from "./search-context";
import { useQuery } from "@tanstack/react-query";
import { RoasteryWithCoffee } from "@/types/roastery";
import { Coffee, CoffeeWithRoastery } from "@/types/coffee";

export default function CoffeeList() {
  const viewOptions = [
    { value: "card", icon: <LayoutGrid className="h-4 w-4" /> },
    { value: "table", icon: <List className="h-4 w-4" /> },
  ] as const;

  const [view, setView] = useState<"card" | "table">("card");

  const { coffees, isLoading, error } = useGetCoffee(view);

  const { searchTerm, setSearchTerm } = useSearch();

  const term = searchTerm.toLowerCase();

  const filteredData =
    view === "card"
      ? (coffees ?? [])
          .map((roastery: RoasteryWithCoffee) => {
            const roasteryMatch = roastery.name.toLowerCase().includes(term);

            const filteredCoffees = roasteryMatch
              ? roastery.coffees ?? [] // 👈 show all coffees
              : (roastery.coffees ?? []).filter((coffee) =>
                  coffee.name.toLowerCase().includes(term)
                );

            return {
              ...roastery,
              coffees: filteredCoffees,
            };
          })
          .filter((roastery: RoasteryWithCoffee) => roastery.coffees.length > 0)
      : coffees.filter(
          (coffee: CoffeeWithRoastery) =>
            coffee.name.toLowerCase().includes(term) ||
            coffee.roasteryRef?.name.toLowerCase().includes(term)
        );

  useQuery({
    queryKey: ["coffee", "table"],
    queryFn: () => fetchCoffee("table"),
    enabled: view === "card",
    staleTime: 5 * 60 * 1000,
  });

  useQuery({
    queryKey: ["coffee", "card"],
    queryFn: () => fetchCoffee("card"),
    enabled: view === "table",
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <div>Loading coffee...</div>;
  if (error) return <div>Error loading coffee</div>;

  return (
    <div className="space-y-6">
      <div className="w-full flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4">
        <SearchInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearchSubmit={(value) =>
            console.log("Search initiated for:", value)
          }
        />
        <ToggleButton
          value={view}
          options={viewOptions}
          onValueChange={setView}
        />
      </div>

      <AnimatePresence mode="wait">
        {view === "table" ? (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <DataTable data={filteredData} />
          </motion.div>
        ) : (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <DataCard data={filteredData} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useGetRoastery } from "@/hooks/roastery/useGetRoastery";
import { DataTable } from "./table/data-table";
import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { ToggleButton } from "../custom-component/ToggleButton";
import { AnimatePresence, motion } from "framer-motion";
import DataCard from "./card/data-card";
import SearchInput from "../custom-component/SearchInput";

export default function RoasteryList() {
  const { roasteries, isLoading, error } = useGetRoastery();

  const viewOptions = [
    { value: "card", icon: <LayoutGrid className="h-4 w-4" /> },
    { value: "table", icon: <List className="h-4 w-4" /> },
  ] as const;

  const [view, setView] = useState<"card" | "table">("card");

  if (isLoading) return <div>Loading roastery...</div>;
  if (error) return <div>Error loading roastery</div>;

  return (
    <div className="space-y-6">
      <div className="w-full flex justify-between">
        <SearchInput
          value=""
          onChange={(e) => console.log(e.target.value)}
          onSearchSubmit={(value) =>
            console.log("Search initiated for:", value)
          }
        />
        <ToggleButton
          value={view}
          options={viewOptions}
          onValueChange={setView}
          className="border"
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
            <DataTable data={roasteries} />
          </motion.div>
        ) : (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <DataCard data={roasteries} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

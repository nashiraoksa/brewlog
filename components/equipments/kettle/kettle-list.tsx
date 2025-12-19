"use client";

import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { ToggleButton } from "@/components/custom-component/ToggleButton";
import { AnimatePresence, motion } from "framer-motion";
import DataCard from "./card/data-card";
import { useGetKettle } from "@/hooks/kettle/useGetKettle";
import { DataTable } from "./table/data-table";
import SearchInput from "@/components/custom-component/SearchInput";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearch } from "./search-context";

export default function KettleList() {
  const { kettles, isLoading, error } = useGetKettle();

  const viewOptions = [
    { value: "card", icon: <LayoutGrid className="h-4 w-4" /> },
    { value: "table", icon: <List className="h-4 w-4" /> },
  ] as const;

  const [view, setView] = useState<"card" | "table">("card");
  const [type, setType] = useState<"all" | "electric" | "stovetop">("all");

  const { searchTerm, setSearchTerm } = useSearch();

  const filteredData = kettles
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => {
      if (type === "all") return true;
      return type === "electric"
        ? item.type.toLowerCase() === "electric"
        : item.type.toLowerCase() === "stovetop";
    });

  if (isLoading) return <div>Loading roastery...</div>;
  if (error) return <div>Error loading roastery</div>;

  return (
    <div className="space-y-6">
      <div className="w-full flex justify-between">
        <div className="flex gap-4">
          <Tabs
            value={type}
            onValueChange={(value) =>
              setType(value as "all" | "electric" | "stovetop")
            }
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="electric">Electric</TabsTrigger>
              <TabsTrigger value="stovetop">Stovetop</TabsTrigger>
            </TabsList>
          </Tabs>
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onSearchSubmit={(value) =>
              console.log("Search initiated for:", value)
            }
          />
        </div>
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
            <DataTable data={filteredData} />
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
            <DataCard data={filteredData} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

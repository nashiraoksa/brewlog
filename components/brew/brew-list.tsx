"use client";

import { AnimatePresence, motion } from "framer-motion";
import DataCard from "./card/data-card";
import SearchInput from "../custom-component/SearchInput";
import { useSearch } from "./search-context";
import { useGetBrew } from "@/hooks/brew/useGetBrew";
import { METHODS } from "@/lib/constants/methods";

const METHOD_MAP = Object.fromEntries(METHODS.map((c) => [c.id, c.name]));

export default function BrewList() {
  const { brews, isLoading, error } = useGetBrew();

  const { searchTerm, setSearchTerm } = useSearch();

  const term = searchTerm.toLowerCase();

  const filteredData = brews.filter(
    (item) =>
      METHOD_MAP[item.method]?.toLowerCase().includes(term) ||
      item.coffee?.name?.toLowerCase().includes(term)
  );

  if (isLoading) return <div>Loading brew...</div>;
  if (error) return <div>Error loading brew</div>;

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
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key="card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
        >
          <DataCard data={filteredData} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

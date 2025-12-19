"use client";

import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { ToggleButton } from "@/components/custom-component/ToggleButton";
import { AnimatePresence, motion } from "framer-motion";
import DataCard from "./card/data-card";
import { useGetDripper } from "@/hooks/dripper/useGetDripper";
import { DataTable } from "./table/data-table";
import SearchInput from "@/components/custom-component/SearchInput";
import { useSearch } from "./search-context";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DRIPPER_TYPES,
  DRIPPER_MATERIALS,
  DripperType,
  DripperMaterial,
} from "@/types/dripper";

export default function DripperList() {
  const { drippers, isLoading, error } = useGetDripper();

  const viewOptions = [
    { value: "card", icon: <LayoutGrid className="h-4 w-4" /> },
    { value: "table", icon: <List className="h-4 w-4" /> },
  ] as const;

  const [view, setView] = useState<"card" | "table">("card");
  const [type, setType] = useState<DripperType | "all">("all");
  const [material, setMaterial] = useState<DripperMaterial | "all">("all");

  const { searchTerm, setSearchTerm } = useSearch();

  const filteredData = drippers
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => (type === "all" ? true : item.type === type))
    .filter((item) => (material === "all" ? true : item.material === material));

  if (isLoading) return <div>Loading drippers...</div>;
  if (error) return <div>Error loading drippers</div>;

  return (
    <div className="space-y-6">
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-4 flex-wrap">
          {/* Dripper Type Filter */}
          <Select
            value={type}
            onValueChange={(value) => setType(value as DripperType | "all")}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {DRIPPER_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.replace("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Dripper Material Filter */}
          <Select
            value={material}
            onValueChange={(value) =>
              setMaterial(value as DripperMaterial | "all")
            }
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Material" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Materials</SelectItem>
              {DRIPPER_MATERIALS.map((material) => (
                <SelectItem key={material} value={material}>
                  {material.replace("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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

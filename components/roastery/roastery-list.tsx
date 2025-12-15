"use client";

import { useGetRoastery } from "@/hooks/roastery/useGetRoastery";
import { DataTable } from "./data-table";

export default function RoasteryList() {
  const { roasteries, isLoading, error } = useGetRoastery();

  if (isLoading) return <div>Loading roastery...</div>;
  if (error) return <div>Error loading roastery</div>;

  return <DataTable data={roasteries} />;
}

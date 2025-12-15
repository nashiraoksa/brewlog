"use client";

import { useGetCoffee } from "@/hooks/coffee/useGetCoffee";

export default function CoffeeList() {
  const { data, isLoading, error } = useGetCoffee();

  if (isLoading) return <div>Loading coffees...</div>;
  if (error) return <div>Error loading coffees</div>;

  return (
    <ul className="space-y-2">
      {data.map((coffee: any) => (
        <li key={coffee.id} className="p-3 bg-accent rounded">
          <div className="font-semibold">{coffee.name}</div>
          <div className="text-sm text-gray-500">{coffee.roasteryRef.name}</div>
        </li>
      ))}
    </ul>
  );
}

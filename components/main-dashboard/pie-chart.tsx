"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A pie chart with a legend";

const chartData = [
  { equipment: "grinder", total: 275, fill: "var(--color-grinder)" },
  {
    equipment: "espressoMachine",
    total: 200,
    fill: "var(--color-espressoMachine)",
  },
  { equipment: "dripper", total: 187, fill: "var(--color-dripper)" },
  { equipment: "filter", total: 173, fill: "var(--color-filter)" },
  { equipment: "scale", total: 90, fill: "var(--color-scale)" },
  { equipment: "kettle", total: 90, fill: "var(--color-kettle)" },
];

const chartConfig = {
  total: {
    label: "Total",
  },
  grinder: { label: "Grinder", color: "var(--chart-1)" },
  espressoMachine: { label: "Espresso Machine", color: "var(--chart-2)" },
  dripper: { label: "Dripper", color: "var(--chart-3)" },
  filter: { label: "Filter", color: "var(--chart-4)" },
  scale: { label: "Scale", color: "var(--chart-5)" },
  kettle: { label: "Kettle", color: "var(--chart-6)" },
} satisfies ChartConfig;

export function ChartPieLegend() {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Equipments</CardTitle>
        <CardDescription>Coffee equipments distribution</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            {/* Tooltip */}
            <ChartTooltip
              content={<ChartTooltipContent nameKey="equipment" />}
            />

            {/* Pie */}
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="equipment"
              cx="50%"
              cy="50%"
              outerRadius={100}
              strokeWidth={2}
              isAnimationActive
            />

            {/* Legend */}
            <ChartLegend
              content={<ChartLegendContent nameKey="equipment" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

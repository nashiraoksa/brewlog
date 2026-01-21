"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A mixed vertical bar chart";

type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

const chartData: { month: Month; brews: number }[] = [
  { month: "January", brews: 200 },
  { month: "February", brews: 173 },
  { month: "March", brews: 275 },
  { month: "April", brews: 187 },
  { month: "May", brews: 90 },
  { month: "June", brews: 214 },
  { month: "July", brews: 221 },
  { month: "August", brews: 198 },
  { month: "September", brews: 245 },
  { month: "October", brews: 260 },
  { month: "November", brews: 230 },
  { month: "December", brews: 290 },
];

const chartConfig = {
  brews: {
    label: "Total Brews",
  },
} satisfies ChartConfig;

const monthColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
];

export function ChartBarMixed() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Monthly Brews</CardTitle>
        <CardDescription>How often you brew coffee</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <YAxis hide />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar dataKey="brews" radius={8}>
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={monthColors[index % monthColors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

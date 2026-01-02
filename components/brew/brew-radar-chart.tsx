"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type Props = {
  aroma: number;
  sweetness: number;
  acidity: number;
  bitterness: number;
  body: number;
};

const chartConfig = {
  score: {
    label: "Score",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function BrewRadarChart({
  aroma,
  sweetness,
  acidity,
  bitterness,
  body,
}: Props) {
  const data = [
    { attribute: "Aroma", score: aroma },
    { attribute: "Acidity", score: acidity },
    { attribute: "Bitterness", score: bitterness },
    { attribute: "Sweetness", score: sweetness },
    { attribute: "Body", score: body },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Brew Profile</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px] overflow-visible"
        >
          <RadarChart
            data={data}
            outerRadius="80%"
            margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
          >
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <PolarGrid />

            <PolarAngleAxis dataKey="attribute" />

            <Radar
              dataKey="score"
              fill="var(--color-score)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

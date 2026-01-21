"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";
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
  maxHeight?: string;
  minHeight?: string;
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
  maxHeight,
  minHeight,
}: Props) {
  const data = [
    { attribute: "Aroma", score: aroma },
    { attribute: "Acidity", score: acidity },
    { attribute: "Bitterness", score: bitterness },
    { attribute: "Sweetness", score: sweetness },
    { attribute: "Body", score: body },
  ];

  const heightClasses =
    minHeight || maxHeight
      ? `${minHeight ?? ""} ${maxHeight ?? ""}`
      : "min-h-[300px] max-h-[300px] sm:min-h-[350px] sm:max-h-[350px] md:min-h-[370px] md:max-h-[370px]";

  return (
    <ChartContainer
      config={chartConfig}
      className={`mx-auto aspect-square overflow-visible ${heightClasses}`}
    >
      <RadarChart
        data={data}
        outerRadius="90%"
        margin={{ top: 0, right: 50, bottom: 0, left: 30 }}
      >
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarGrid />
        <PolarAngleAxis dataKey="attribute" />
        <PolarRadiusAxis
          domain={[0, 10]}
          tick={false}
          tickCount={10}
          axisLine={false}
        />
        <Radar dataKey="score" fill="var(--color-score)" fillOpacity={0.6} />
      </RadarChart>
    </ChartContainer>
  );
}

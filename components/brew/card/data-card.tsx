import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Actions } from "./actions";
import { METHODS } from "@/lib/constants/methods";
import { BrewWithCoffee } from "@/types/brew";
import { BrewRadarChart } from "../brew-radar-chart";
import { RatingStar } from "@/components/custom-component/RatingStar";

const METHOD_MAP = Object.fromEntries(METHODS.map((c) => [c.id, c.name]));

export default function DataCard({ data }: { data: BrewWithCoffee[] }) {
  return (
    <>
      {data.map((item) => (
        <Card
          key={item.id}
          className="shadow-lg hover:shadow-xl transition-shadow duration-300 
             flex flex-col justify-between h-full"
        >
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg font-semibold leading-snug pr-4">
                {item.coffee?.name}
              </CardTitle>
              <Actions item={item} />
            </div>
            <CardDescription>
              <Badge variant="default" className="flex-shrink-0">
                {METHOD_MAP[Number(item.method)] ?? item.method}
              </Badge>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Overall Rating:</span>
              <span className="font-medium flex gap-1 items-center">
                {item.overall ?? "-"} / 10
                <RatingStar value={item.overall ?? 0} />
              </span>
            </div>
            <BrewRadarChart
              aroma={item.aroma}
              sweetness={item.sweetness}
              acidity={item.acidity}
              bitterness={item.bitterness}
              body={item.body}
              maxHeight="300px"
            />
          </CardContent>
        </Card>
      ))}
    </>
  );
}

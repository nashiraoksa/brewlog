import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Actions } from "./actions";
import { COUNTRIES } from "@/lib/constants/countries";
import { Roastery } from "@/types/roastery";

const COUNTRY_MAP = Object.fromEntries(COUNTRIES.map((c) => [c.code, c.name]));

export default function DataCard({ data }: { data: Roastery[] }) {
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
                {item.name}
              </CardTitle>
              <Actions item={item} />
            </div>
            <CardDescription>
              <Badge variant="default" className="flex-shrink-0">
                {COUNTRY_MAP[item.country] ?? item.country}
              </Badge>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Address:</span>
              <span className="font-medium">{item.address || "-"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">City:</span>
              <span className="font-medium">{item.city || "-"}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

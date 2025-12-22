import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Actions } from "./actions";
import { COUNTRIES, countryCodeToFlag } from "@/lib/constants/countries";
import { CoffeeWithRoastery } from "@/types/coffee";
import { formatRupiah } from "@/lib/helper/rupiahFormatter";

const COUNTRY_MAP = Object.fromEntries(COUNTRIES.map((c) => [c.code, c.name]));

export default function DataCard({ data }: { data: any[] }) {
  return (
    <section className="w-full flex flex-col gap-4">
      {data.map((item) => (
        <section className="w-full space-y-2">
          <h4 className="text-xl">
            {item.name} {countryCodeToFlag(item.country)}
          </h4>
          <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {item.coffees?.map((item: any) => (
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
                      {item.roast_level}
                    </Badge>
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Country:</span>
                    <span className="font-medium">
                      {COUNTRY_MAP[item.country] || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Weight:</span>
                    <span className="font-medium">
                      {item.weight ? ` ${item.weight} g` : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price:</span>
                    {item.price ? formatRupiah(item.price) : "-"}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}

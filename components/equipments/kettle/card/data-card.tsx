import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Actions } from "./actions";
import { Kettle } from "@/types/kettle";

export default function DataCard({ data }: { data: Kettle[] }) {
  const getTypeVariant = (type: string) => {
    if (type.toLowerCase() === "electric") return "default";
    if (type.toLowerCase() === "stovetop") return "secondary";
    return "outline";
  };

  if (!data.length) {
    return (
      <div className="col-span-full flex items-center justify-center rounded-lg border border-dashed p-10 text-center">
        <div className="space-y-2">
          <p className="text-sm font-medium">No kettles found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filters.
          </p>
        </div>
      </div>
    );
  }

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
              <Badge
                variant={getTypeVariant(item.type)}
                className="flex-shrink-0"
              >
                {item.type}
              </Badge>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Purchase Date:</span>
              <span className="font-medium">
                {item.purchase_date
                  ? new Date(item.purchase_date).toLocaleDateString()
                  : "-"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Details:</span>
              <span className="font-medium max-w-[80px] truncate">
                {item.details || "-"}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

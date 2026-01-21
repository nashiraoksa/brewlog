import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Coffee } from "lucide-react";
import { ReactNode } from "react";

interface StatProps {
  title: string;
  icon?: ReactNode;
  total: number;
  maincaption: string;
  smallcaption: string;
}

export default function StatCard({
  title,
  icon,
  total,
  maincaption,
  smallcaption,
}: StatProps) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {total}
        </CardTitle>
        <CardAction>
          <Badge variant="outline" className="h-5 dark:border-neutral-500">
            {icon || <Coffee className="opacity-60" />}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">{maincaption}</div>
        <div className="text-muted-foreground">{smallcaption}</div>
      </CardFooter>
    </Card>
  );
}

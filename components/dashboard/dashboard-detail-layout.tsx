import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

export default function DashboardDetailLayout({
  children,
  title,
  description,
  backAction,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  backAction?: () => void;
}) {
  return (
    <section className="space-y-6">
      <header className="w-full flex flex-col items-start justify-between gap-6">
        <Button onClick={backAction} size="sm" variant="outline">
          <ChevronLeft className="w-5" /> Back
        </Button>
        <section className="w-full flex-col justify-between items-center">
          <h2 className="text-2xl font-semibold text-foreground text-primary">
            {title}
          </h2>
          <span className="text-foreground opacity-50">{description}</span>
        </section>
      </header>
      <main>{children}</main>
    </section>
  );
}

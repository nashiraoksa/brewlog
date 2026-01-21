"use client";

import { useGetBrewById } from "@/hooks/brew/useGetBrewById";
import { useParams, useRouter } from "next/navigation";
import DashboardDetailLayout from "@/components/dashboard/dashboard-detail-layout";
import { METHODS } from "@/lib/constants/methods";
import { BrewRadarChart } from "@/components/brew/brew-radar-chart";
import DetailCard from "@/components/brew/details/details-card";
import { RatingStar } from "@/components/custom-component/RatingStar";
import { DialogTimer } from "@/components/brew/timer/dialog-timer";
import { BrewStepsTimeline } from "@/components/brew/details/brew-step-timeline";
import { Button } from "@/components/ui/button";
import { FlaskConical } from "lucide-react";

const METHOD_MAP = Object.fromEntries(METHODS.map((c) => [c.id, c.name]));

export default function BrewDetailPage() {
  const params = useParams();
  const brewId = params.id as string;

  const router = useRouter();

  const { brew, isLoading } = useGetBrewById(brewId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!brew) {
    return <div>Brew not found</div>;
  }

  return (
    <DashboardDetailLayout
      title={brew.coffee.name}
      description={METHOD_MAP[brew.method]}
      backAction={() => router.push("/dashboard/brews")}
    >
      <div className="grid grid-cols-1 gap-8 lg:gap-2 lg:grid-cols-2 xl:grid-cols-3">
        <div className="flex flex-col justify-center items-center gap-4">
          <h3 className="font-semibold text-2xl text-primary">Profile</h3>
          <div className="w-full h-full bg-card border rounded-bl-3xl flex flex-col items-center justify-center">
            <BrewRadarChart
              aroma={brew.aroma}
              sweetness={brew.sweetness}
              acidity={brew.acidity}
              bitterness={brew.bitterness}
              body={brew.body}
            />
            <div className="flex gap-4 items-center justify-center mb-8">
              <span className="opacity-60">Overall Rating:</span>
              <div className="flex items-center gap-1">
                {brew.overall ?? "-"} / 10
                <RatingStar value={brew.overall ?? 0} />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4 xl:col-span-2">
          <DetailCard title="Equipments">
            <div className="w-full flex justify-between">
              <span className="opacity-60">Grinder:</span>
              <span className="font-medium">{brew.grinder?.name || "-"}</span>
            </div>
            <div className="w-full flex justify-between">
              <span className="opacity-60">Dripper:</span>
              <span className="font-medium">{brew.dripper?.name || "-"}</span>
            </div>
            <div className="w-full flex justify-between">
              <span className="opacity-60">Espresso Machine:</span>
              <span className="font-medium">
                {brew.espressoMachine?.name || "-"}
              </span>
            </div>
            <div className="w-full flex justify-between">
              <span className="opacity-60">Filter:</span>
              <span className="font-medium">{brew.filter?.name || "-"}</span>
            </div>
            <div className="w-full flex justify-between">
              <span className="opacity-60">Kettle:</span>
              <span className="font-medium">{brew.kettle?.name || "-"}</span>
            </div>
            <div className="w-full flex justify-between">
              <span className="opacity-60">Scale:</span>
              <span className="font-medium">{brew.scale?.name || "-"}</span>
            </div>
          </DetailCard>
          <DetailCard title="Recipes">
            <div className="w-full flex justify-between">
              <span className="opacity-60">Grind Setting:</span>
              <span className="font-medium">{brew.grindSetting || "-"}</span>
            </div>
            <div className="w-full flex justify-between">
              <span className="opacity-60">Coffee Amount (g):</span>
              <span className="font-medium">{brew.coffeeAmount || "-"} g</span>
            </div>
            <div className="w-full flex justify-between">
              <span className="opacity-60">Water Amount (g):</span>
              <span className="font-medium">{brew.waterAmount || "-"} g</span>
            </div>
            <div className="w-full flex justify-between">
              <span className="opacity-60">
                Water Temperature (°{brew.temperatureMetric}):
              </span>
              <span className="font-medium">
                {brew.waterTemperature || "-"} °{brew.temperatureMetric}
              </span>
            </div>
            <div className="w-full flex justify-between">
              <span className="opacity-60">Extraction Time:</span>
              <span className="font-medium">
                {brew.brewMinutes || "-"} m {brew.brewSeconds || "-"} s
              </span>
            </div>
          </DetailCard>
        </div>
      </div>
      {brew.steps.length > 0 && (
        <div>
          <div className="mt-8 space-y-6">
            <div className="w-full flex items-center justify-start gap-2">
              <h3 className="font-semibold text-2xl text-primary">Process</h3>
              <DialogTimer
                steps={brew.steps}
                trigger={
                  <Button size="sm" variant="default">
                    <FlaskConical className="w-4" /> Brew
                  </Button>
                }
              />
            </div>
            <BrewStepsTimeline steps={brew.steps} />
          </div>
        </div>
      )}
    </DashboardDetailLayout>
  );
}

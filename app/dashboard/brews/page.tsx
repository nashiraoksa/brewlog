"use client";

// import BrewForm from "@/components/brew/BrewForm";
import BrewForm from "@/components/brew/brew-form";
import { BrewRadarChart } from "@/components/brew/brew-radar-chart";
import { useGetBrew } from "@/hooks/brew/useGetBrew";

export default function BrewPage() {
  const { brews, isLoading, isError, error } = useGetBrew();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* ---------- FORM ---------- */}
      <BrewForm mode="create" onSuccess={() => {}} onClose={() => {}} />

      {/* ---------- BREW LIST ---------- */}
      <div>
        <h2 className="text-xl font-semibold mb-4">My Brews</h2>

        {isLoading && <p>Loading…</p>}
        {isError && <p className="text-red-500">{error?.message}</p>}

        {!isLoading && brews.length === 0 && (
          <p className="text-muted-foreground">No brews yet.</p>
        )}

        <ul className="space-y-6">
          {brews.map((brew) => (
            <li key={brew.id} className="border rounded-md p-4 space-y-3">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{brew.method}</p>
                  <p className="text-sm text-muted-foreground">
                    {brew.coffeeAmount}g • {brew.waterAmount}ml
                  </p>
                </div>

                <div className="text-sm">
                  {brew.brewMinutes}:
                  {brew.brewSeconds.toString().padStart(2, "0")}
                </div>
              </div>

              <BrewRadarChart
                aroma={brew.aroma}
                sweetness={brew.sweetness}
                acidity={brew.acidity}
                bitterness={brew.bitterness}
                body={brew.body}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

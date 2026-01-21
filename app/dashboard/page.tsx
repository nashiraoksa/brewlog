import { ChartPieLegend } from "@/components/main-dashboard/pie-chart";
import { ChartBarMixed } from "@/components/main-dashboard/bar-chart";
import StatCard from "@/components/main-dashboard/stat-card";
import { Coffee, Grape, Settings2, Heater } from "lucide-react";

type CardIconKey = keyof typeof cardIcons;

const cardIcons = {
  brews: <Coffee className="opacity-60" />,
  coffees: <Grape className="opacity-60" />,
  roasteries: <Heater className="opacity-60" />,
  equipments: <Settings2 className="opacity-60" />,
};

type StatItem = {
  key: CardIconKey;
  title: string;
  total: number;
  maincaption: string;
  smallcaption: string;
};

const stats: StatItem[] = [
  {
    key: "brews",
    title: "Total Brews",
    total: 247,
    maincaption: "Your brewing journey",
    smallcaption: "Coffees you’ve brewed so far",
  },
  {
    key: "coffees",
    title: "Total Coffee Beans",
    total: 18,
    maincaption: "Beans you’ve explored",
    smallcaption: "Coffee beans you’ve purchased",
  },
  {
    key: "roasteries",
    title: "Total Roasteries",
    total: 9,
    maincaption: "Roasteries you’ve visited",
    smallcaption: "Your coffee source",
  },
  {
    key: "equipments",
    title: "Total Equipments",
    total: 6,
    maincaption: "Your brewing setup",
    smallcaption: "Equipment you own and use",
  },
];

export default function DashboardPage() {
  return (
    <div className="bg-background w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6">
      {stats.map((item) => (
        <StatCard
          key={item.key}
          title={item.title}
          total={item.total}
          icon={cardIcons[item.key]}
          maincaption={item.maincaption}
          smallcaption={item.smallcaption}
        />
      ))}

      <div className="sm:col-span-2 lg:col-span-4 grid grid-cols-1 lg:grid-cols-5 gap-4 xl:gap-6">
        <div className="lg:col-span-2">
          <ChartPieLegend />
        </div>
        <div className="lg:col-span-3">
          <ChartBarMixed />
        </div>
      </div>
    </div>
  );
}

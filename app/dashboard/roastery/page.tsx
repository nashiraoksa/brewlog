import DashboardLayout from "@/components/dashboard/dashboard-layout";
import RightContent from "@/components/roastery/right-content";
import RoasteryList from "@/components/roastery/roastery-list";
import { SearchProvider } from "@/components/roastery/search-context";

export default function CoffeePage() {
  return (
    <SearchProvider>
      <DashboardLayout
        title="Roastery"
        description="Your coffee roasteries."
        rightContent={<RightContent />}
      >
        <RoasteryList />
      </DashboardLayout>
    </SearchProvider>
  );
}

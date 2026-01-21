import DashboardLayout from "@/components/dashboard/dashboard-layout";
import RightContent from "@/components/brew/right-content";
import BrewList from "@/components/brew/brew-list";
import { SearchProvider } from "@/components/brew/search-context";

export default function CoffeePage() {
  return (
    <SearchProvider>
      <DashboardLayout
        title="Brew Logs"
        description="Your coffee brews."
        rightContent={<RightContent />}
      >
        <BrewList />
      </DashboardLayout>
    </SearchProvider>
  );
}

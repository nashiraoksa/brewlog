import DashboardLayout from "@/components/dashboard/dashboard-layout";
import RightContent from "@/components/coffee/right-content";
import CoffeeList from "@/components/coffee/coffee-list";
import { SearchProvider } from "@/components/coffee/search-context";

export default function CoffeePage() {
  return (
    <SearchProvider>
      <DashboardLayout
        title="Coffee"
        description="Your coffee coffees."
        rightContent={<RightContent />}
      >
        <CoffeeList />
      </DashboardLayout>
    </SearchProvider>
  );
}

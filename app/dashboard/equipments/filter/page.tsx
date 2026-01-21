import DashboardLayout from "@/components/dashboard/dashboard-layout";
import RightContent from "@/components/equipments/filter/right-content";
import FilterList from "@/components/equipments/filter/filter-list";
import { SearchProvider } from "@/components/equipments/filter/search-context";

export default function FilterPage() {
  return (
    <SearchProvider>
      <DashboardLayout
        title="Filter"
        description="Your coffee filters."
        rightContent={<RightContent />}
      >
        <FilterList />
      </DashboardLayout>
    </SearchProvider>
  );
}

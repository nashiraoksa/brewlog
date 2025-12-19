import DashboardLayout from "@/components/dashboard/dashboard-layout";
import RightContent from "@/components/equipments/kettle/right-content";
import KettleList from "@/components/equipments/kettle/kettle-list";
import { SearchProvider } from "@/components/equipments/kettle/search-context";

export default function KettlePage() {
  return (
    <SearchProvider>
      <DashboardLayout
        title="Kettle"
        description="Your coffee kettles."
        rightContent={<RightContent />}
      >
        <KettleList />
      </DashboardLayout>
    </SearchProvider>
  );
}

import DashboardLayout from "@/components/dashboard/dashboard-layout";
import RightContent from "@/components/equipments/scale/right-content";
import ScaleList from "@/components/equipments/scale/scale-list";
import { SearchProvider } from "@/components/equipments/scale/search-context";

export default function ScalePage() {
  return (
    <SearchProvider>
      <DashboardLayout
        title="Scale"
        description="Your coffee scales."
        rightContent={<RightContent />}
      >
        <ScaleList />
      </DashboardLayout>
    </SearchProvider>
  );
}

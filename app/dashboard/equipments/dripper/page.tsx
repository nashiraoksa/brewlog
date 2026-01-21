import DashboardLayout from "@/components/dashboard/dashboard-layout";
import RightContent from "@/components/equipments/dripper/right-content";
import DripperList from "@/components/equipments/dripper/dripper-list";
import { SearchProvider } from "@/components/equipments/dripper/search-context";

export default function DripperPage() {
  return (
    <SearchProvider>
      <DashboardLayout
        title="Dripper"
        description="Your coffee drippers."
        rightContent={<RightContent />}
      >
        <DripperList />
      </DashboardLayout>
    </SearchProvider>
  );
}

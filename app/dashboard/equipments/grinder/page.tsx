import DashboardLayout from "@/components/dashboard/dashboard-layout";
import RightContent from "@/components/equipments/grinder/right-content";
import GrinderList from "@/components/equipments/grinder/grinder-list";
import { SearchProvider } from "@/components/equipments/grinder/search-context";

export default function GrinderPage() {
  return (
    <SearchProvider>
      <DashboardLayout
        title="Grinder"
        description="Your coffee grinders."
        rightContent={<RightContent />}
      >
        <GrinderList />
      </DashboardLayout>
    </SearchProvider>
  );
}

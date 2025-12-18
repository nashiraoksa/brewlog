import DashboardLayout from "@/components/dashboard/dashboard-layout";
import RightContent from "@/components/equipments/espresso-machine/right-content";
import EspressoMachineList from "@/components/equipments/espresso-machine/espresso-machine-list";
import { SearchProvider } from "@/components/equipments/espresso-machine/search-context";

export default function EspressoMachinePage() {
  return (
    <SearchProvider>
      <DashboardLayout
        title="Espresso Machine"
        description="Your espresso machine."
        rightContent={<RightContent />}
      >
        <EspressoMachineList />
      </DashboardLayout>
    </SearchProvider>
  );
}

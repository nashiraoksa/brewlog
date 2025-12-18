import DashboardLayout from "@/components/dashboard/dashboard-layout";
import CreateRoasteryDialog from "@/components/roastery/create-dialog";
import RoasteryList from "@/components/roastery/roastery-list";

export default function CoffeePage() {
  return (
    <DashboardLayout
      title="Roastery"
      description="Your coffee roasteries."
      rightContent={
        <div className="w-full flex justify-end">
          <CreateRoasteryDialog />
        </div>
      }
    >
      <RoasteryList />
    </DashboardLayout>
  );
}

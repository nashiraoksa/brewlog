import DashboardLayout from "@/components/dashboard/dashboard-layout";
import RoasteryForm from "@/components/roastery/roastery-form";
// import CoffeeList from "@/components/coffee/coffee-list";
// import CoffeeForm from "@/components/coffee/coffee-form";
import RoasteryList from "@/components/roastery/roastery-list";

export default function CoffeePage() {
  return (
    <DashboardLayout title="Roastery">
      {/* <CoffeeForm /> */}
      {/* <RoasteryForm /> */}

      {/* <div className="space-y-4">
        <h2 className="text-xl font-bold">Coffee Roastery</h2> */}
      <RoasteryList />
      {/* </div> */}
    </DashboardLayout>
  );
}

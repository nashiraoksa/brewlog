import DashboardLayout from "@/components/dashboard/dashboard-layout";
import CoffeeList from "@/components/coffee/coffee-list";
import CoffeeForm from "@/components/coffee/coffee-form";

export default function CoffeePage() {
  return (
    <DashboardLayout title="Coffee">
      <CoffeeForm />

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Your Coffees</h2>
        <CoffeeList />
      </div>
    </DashboardLayout>
  );
}

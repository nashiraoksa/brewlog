"use client";

import * as React from "react";
import {
  Frame,
  Map,
  PieChart,
  Settings2,
  Grape,
  Coffee,
  Heater,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { NavHeader } from "@/components/nav-header";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Brew Log",
      url: "/dashboard/brews",
      icon: Coffee,
    },
    {
      title: "Coffee Beans",
      url: "/dashboard/coffee",
      icon: Grape,
    },
    {
      title: "Roastery",
      url: "/dashboard/roastery",
      icon: Heater,
    },
    {
      title: "Equipments",
      url: "#",
      icon: Settings2,
      isActive: true,
      items: [
        {
          title: "Grinder",
          url: "/dashboard/equipments/grinder",
        },
        {
          title: "Espresso Machine",
          url: "/dashboard/equipments/espresso-machine",
        },
        {
          title: "Dripper",
          url: "/dashboard/equipments/dripper",
        },
        {
          title: "Filter",
          url: "/dashboard/equipments/filter",
        },
        {
          title: "Scale",
          url: "/dashboard/equipments/scale",
        },
        {
          title: "Kettle",
          url: "/dashboard/equipments/kettle",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession(); // Use the useSession hook to get session data

  // Set fallback values for user fields if they are null or undefined
  const user = {
    name: session?.user?.name ?? "Guest User",
    email: session?.user?.email ?? "guest@example.com",
    image: session?.user?.image ?? "/avatars/default.jpg", // Fallback avatar
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

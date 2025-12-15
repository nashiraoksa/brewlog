"use client";

// import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import toTitleCase from "@/lib/helper/toTitleCase";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import QueryProvider from "@/components/providers/query-providers";
import dynamic from "next/dynamic";

const AppSidebar = dynamic(
  () => import("@/components/app-sidebar").then((mod) => mod.AppSidebar),
  { ssr: false }
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const currentPath = usePathname();
  const pathSegments = currentPath.split("/").filter(Boolean);

  const generateBreadcrumbs = () => {
    let fullPath = "";
    return pathSegments.map((segment, index) => {
      fullPath += `/${segment}`;

      return (
        <React.Fragment key={fullPath}>
          {index > 0 && <BreadcrumbSeparator key={`separator-${index}`} />}{" "}
          <BreadcrumbItem key={fullPath}>
            <BreadcrumbLink href={fullPath}>
              {toTitleCase(segment)}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </React.Fragment>
      );
    });
  };

  return (
    <SessionProvider>
      <QueryProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b border-muted">
              <div className="w-full flex justify-between pr-4">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                  />
                  <Breadcrumb>
                    <BreadcrumbList>{generateBreadcrumbs()}</BreadcrumbList>
                  </Breadcrumb>
                </div>
                <ThemeToggle />
              </div>
            </header>

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </QueryProvider>
    </SessionProvider>
  );
}

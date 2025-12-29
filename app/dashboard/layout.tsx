"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
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
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AppSidebar = dynamic(
  () => import("@/components/app-sidebar").then((mod) => mod.AppSidebar),
  { ssr: false }
);

function useWindowWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const currentPath = usePathname();
  const pathSegments = currentPath.split("/").filter(Boolean);

  const width = useWindowWidth();

  const generateBreadcrumbs = () => {
    const smallScreen = width < 640;

    if (!smallScreen || pathSegments.length <= 2) {
      let fullPath = "";
      return pathSegments.map((segment, index) => {
        fullPath += `/${segment}`;
        return (
          <React.Fragment key={fullPath}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem className="shrink-0 whitespace-nowrap">
              <BreadcrumbLink href={fullPath}>
                {toTitleCase(segment)}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        );
      });
    }

    const first = pathSegments[0];
    const last = pathSegments[pathSegments.length - 1];
    const middleSegments = pathSegments.slice(1, -1);

    return (
      <>
        <BreadcrumbItem className="shrink-0 whitespace-nowrap">
          <BreadcrumbLink href={`/${first}`}>
            {toTitleCase(first)}
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem className="shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span className="cursor-pointer select-none text-muted-foreground">
                …
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {middleSegments.map((segment, idx) => (
                <DropdownMenuItem key={idx} asChild>
                  <BreadcrumbLink
                    href={`/${[first, ...middleSegments.slice(0, idx + 1)].join(
                      "/"
                    )}`}
                  >
                    {toTitleCase(segment)}
                  </BreadcrumbLink>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem className="shrink-0 whitespace-nowrap">
          <BreadcrumbLink href={`/${pathSegments.join("/")}`}>
            {toTitleCase(last)}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </>
    );
  };

  return (
    <SessionProvider>
      <QueryProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="min-w-0">
            <header className="flex min-w-0 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b border-muted">
              <div className="w-full flex justify-between pr-4">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                  />
                  <Breadcrumb>
                    <BreadcrumbList className="w-full flex flex-nowrap min-w-0 overflow-hidden max-w-[250px] sm:max-w-full">
                      {generateBreadcrumbs()}
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
                <ThemeToggle />
              </div>
            </header>

            <div className="min-w-0 flex flex-1 flex-col gap-4 p-8">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </QueryProvider>
    </SessionProvider>
  );
}

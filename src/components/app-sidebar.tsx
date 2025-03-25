"use client"

import * as React from "react"
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "dashboard",
      icon: LayoutDashboardIcon,
    },

    {
      title: "Reports",
      icon: ClipboardListIcon,
      url: "#",
      items: [
        {
          title: "XML Feed reports",
          url: "३",
          items: [
            { title: "by Date", url: "/xmlreportbydate" },
            { title: "reportinsideb", url: "#" },
          ],
        },
        {
          title: "Report B",
          url: "#",
        },
      ],
    },
    {
      title: "Zones",
      icon: ListIcon,
      url: "#",
      items: [
        {
          title: "Banner Zone",
          url: "/publisher/bannerzones",
          icon: ListIcon,

        },
        {
          title: "Pop Zone",
          url: "#",
          icon: ListIcon,

        },
        {
          title: "Vast Zone",
          url: "/publisher/vastzones",
          icon: ListIcon,

        },
      ],
    },



    {
      title: "Analytics",
      url: "#",
      icon: BarChartIcon,
    },
    {
      title: "Projects",
      url: "#",
      icon: FolderIcon,
    },
    {
      title: "Team",
      url: "#",
      icon: UsersIcon,
    },
  ],
  
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
    
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
  ],
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="w-5 h-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

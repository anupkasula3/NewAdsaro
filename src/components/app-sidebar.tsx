"use client"

import * as React from "react"
import {
  
  BarChartIcon,
  
  ClipboardListIcon,
 
  FolderIcon,
  
  LayoutDashboardIcon,
  ListIcon,

  SettingsIcon,

} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import logo from "../../public/logo.png"; // Direct path from public folder

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"

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
          url: "#",
          items: [
            { title: "by Date", url: "/publisher/xmlreportbydate" },
            { title: "by country", url: "/publisher/xmlreportbycountry" },
          ],
        },
        {
          title: "Display Zone reports",
          url: "#",
          items: [
            { title: "by Date", url: "/publisher/zonereportbydate" },
            { title: "by country", url: "/publisher/zonereportbycountry" },
          ],
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
      title: "Payments",
      icon: BarChartIcon,
      url: "#",
      items: [
        {
          title: "Payment Transactions",
          url: "/publisher/paymenttranscation",
        },
        {
          title: "Payment Information",
          url: "#",
        },
      ],
    },




    {
      title: "Referrals",
      url: "/publisher/referrals",
      icon: FolderIcon,
    },
   
  ],
  
  navSecondary: [
    {
      title: "Settings",
      url: "/publisher/profile",      
      icon: SettingsIcon,
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
              <a className="h-14" href="#">
       
                  
                              <Image alt="logo" width={150} src={logo} />
              
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

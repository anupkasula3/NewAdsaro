import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import data from "./data.json"
import { ZoneDataTable } from "@/components/zone-data-table"
import { useEffect } from "react"
import { Payment, columns } from "./columns"
import { DataTableDemo } from "./data-table"


interface BannerZoneData {
  date: string
  pub_clicks: number
  pub_epc: number
  pub_revenue: number
  pub_gross: number
  pub_requests: number
  pub_ecpm: number
  pub_net_clicks: number
  pub_ctr: number
  pub_pixel_impressions: number
}


export default async function Zone() {
  

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-col flex-1">
        <div className="container py-10 mx-auto">
      <DataTableDemo  />
    </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

import { AppSidebar } from "@/components/app-sidebar"

import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"



export default function Anup() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          anup
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

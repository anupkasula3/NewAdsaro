"use client"

import {
  ChevronDownIcon,
  ChevronRightIcon,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type NavItem = {
  title: string
  url: string
  icon?: LucideIcon
  items?: NavItem[] // 👈 support for subitems
}

export function NavMain({ items }: { items: NavItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            {/* <SidebarMenuButton
              tooltip="Quick Create"
              className="duration-200 ease-linear min-w-8 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            >
              <PlusCircleIcon />
              <span>Quick Create</span>
            </SidebarMenuButton> */}
            {/* <Button
              size="icon"
              className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <MailIcon />
              <span className="sr-only">Inbox</span>
            </Button> */}
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Recursive Menu Rendering */}
        <SidebarMenu>
          {items.map((item) => (
            <NavMenuItem key={item.title} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

// Recursive Component for Menu Items
function NavMenuItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)

  if (item.items && item.items.length > 0) {
    return (
      <div className="w-full">
        <SidebarMenuItem
          onClick={() => setOpen(!open)}
          className="cursor-pointer"
        >
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            <span className="flex-1">{item.title}</span>
            {open ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
          </SidebarMenuButton>
        </SidebarMenuItem>

        {open && (
          <div className="pl-3 ml-4 space-y-1 border-l">
            {item.items.map((subItem) => (
              <NavMenuItem key={subItem.title} item={subItem} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link href={item.url}>
      <SidebarMenuItem>
        <SidebarMenuButton tooltip={item.title}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  )
}

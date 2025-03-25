"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  country: string
  request: number
  pub_pixel_impressions: number
  pub_net_clicks: number
  pub_ctr: number
  pub_clicks: number


}

export const columns: ColumnDef<Payment>[] = [
  { accessorKey: "country", header: "Country" },
  { accessorKey: "request", header: "Requests" },
  { accessorKey: "pub_pixel_impressions", header: "Impression" },
  { accessorKey: "pub_net_clicks", header: "Gross Clicks" },
  { accessorKey: "pub_clicks", header: "Verfied Clicks" },


 
]

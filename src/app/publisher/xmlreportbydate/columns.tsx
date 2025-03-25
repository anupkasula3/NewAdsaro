"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
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

export const columns: ColumnDef<Payment>[] = [
  { accessorKey: "date", header: "Date" },
  { accessorKey: "pub_clicks", header: "Clicks" },
  { accessorKey: "pub_epc", header: "EPC" },
  { accessorKey: "pub_revenue", header: "Revenue" },
  { accessorKey: "pub_gross", header: "Gross" },
  { accessorKey: "pub_requests", header: "Requests" },
  { accessorKey: "pub_ecpm", header: "eCPM" },
  { accessorKey: "pub_net_clicks", header: "Net Clicks" },
  { accessorKey: "pub_ctr", header: "CTR (%)" },
  { accessorKey: "pub_pixel_impressions", header: "Pixel Impressions" },
]

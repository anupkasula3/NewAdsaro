"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/context/context";
import axios from "axios";
import { useEffect, useState } from "react";

interface PublisherData {
  id: number;
  name: string;
  timestamp: string;
  email: string;
  website: string;
  address_apt: string;
  address_city: string;
  address_country: string;
  address_state: string;
  address_street: string;
  address_zip: string;
  balance: number;
  company: string;
  hide_notifications: boolean;
  login: string;
  other_contacts: string;
  password: string | null;
  password_current: string | null;
  password_repeat: string | null;
  password_stats: string;
  phone: string;
  skype_id: string;
  ui_theme: string;
  website_descr: string;
}
export function SiteHeader() {
  const [currentPage, setCurrentPage] = useState<string>("");
  const [data, setData] = useState<PublisherData | null>(null);
  const auth = useAuth();
  const mytoken = auth?.token;

  console.log(mytoken, "balance");

  useEffect(() => {
    // Check if mytoken exists
    if (!mytoken) {
      console.log("Token not available");
      return; // Avoid fetching if token is missing
    }

    const fetchData = async () => {
      console.log(mytoken, "Fetching balance...");

      try {
        const response = await axios.get(
          `https://panel.adsaro.com/publisher/api/Account?version=4&token=${mytoken}`
        );
        console.log("Balance fetched:", response.data.response.rows[0].balance);
        setData(response.data.response.rows[0]); // Store response in state
      } catch (err) {
        console.error("Error fetching balance:", err);
      }
    };

    fetchData();
  }, [mytoken]);

  useEffect(() => {
    const path = window.location.pathname;
    const page = path.split("/").filter(Boolean).pop() || "";
    setCurrentPage(page.charAt(0).toUpperCase() + page.slice(1));
  }, []);
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex items-center justify-between w-full gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="flex items-center w-full gap-1 px-4 lg:gap-2 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-base font-medium">{currentPage}</h1>
        </div>
        <div className="flex">${data ? data.balance : "..."}</div>
      </div>
    </header>
  );
}

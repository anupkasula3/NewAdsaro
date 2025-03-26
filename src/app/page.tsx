
"use client";
import { useRouter } from "next/navigation";

import { useEffect } from "react";


export default function Home() {
  const router=useRouter();
  useEffect(()=>{
  router.push("publisher/signup");
  },[])
  return (
    <div className="flex items-center justify-center w-full p-6 min-h-svh md:p-10">
    <div className="w-full max-w-2xl">
     Hello World !!
    </div>
  </div>
  );
}

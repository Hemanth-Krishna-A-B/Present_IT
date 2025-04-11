"use client";

import { useEffect, useState } from "react";
import TopBar from "../components/admindashboard/TopBar";
import MobileNavBar from "../components/Small_screen/MobileNavBar";

export default function AdminDashboardLayout({ children }) {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed top-0 left-0 w-full z-50">
        {isMobile ? <MobileNavBar /> : <TopBar />}
      </div>
  
      <div className="pt-14 p-2">{children}</div>
    </div>
  );
  
}

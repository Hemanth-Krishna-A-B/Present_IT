"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import AdminHomePage_S from "../components/Small_screen/AdminHomePage_S";
import AdminHomePage_L from "../components/Large_screen/AdminHomePage_L";

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return isMobile ? <AdminHomePage_S /> : <AdminHomePage_L />;
}

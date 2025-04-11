"use client";

import { useRouter } from "next/navigation";

export default function TopBar() {
  const router = useRouter();

  return (
    <div className="h-14 bg-blue-500 w-full flex items-center justify-between px-6 shadow-md">
      <div className="text-white font-bold text-lg tracking-wide">
        PRESENT_IT
      </div>

      <div className="flex gap-20 text-white font-semibold text-sm sm:text-base">
        <button onClick={() => router.push("/Admin_Dashboard")} className="hover:text-yellow-300 transition">
          Home
        </button>
        <button onClick={() => router.push("/Admin_Dashboard/Create_Page")} className="hover:text-yellow-300 transition">
          Create Resources
        </button>
        <button onClick={() => router.push("/Admin_Dashboard/Reports_page")} className="hover:text-yellow-300 transition">
          Reports
        </button>
        <button onClick={() => router.push("/Admin_Dashboard/My_Data_Page")} className="hover:text-yellow-300 transition">
          My Data
        </button>
      </div>

      <button
        onClick={() => {
          console.log("Logout clicked");
        }}
        className="bg-white text-rose-500 font-semibold px-4 py-1 rounded hover:bg-yellow-200 transition"
      >
        Logout
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";

export default function MobileNavBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (path) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <div className="bg-blue-500 text-white shadow-md w-full">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo / Title */}
        <div className="text-lg font-semibold">PRESENT_IT</div>

        {/* Menu Toggle Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="flex flex-col gap-3 px-4 pb-4 text-sm font-medium">
          <button onClick={() => handleNavigate("/Admin_Dashboard")} className="hover:text-yellow-300">
            Home
          </button>
          <button onClick={() => handleNavigate("/Admin_Dashboard/Create_Page")} className="hover:text-yellow-300">
            Create Resources
          </button>
          <button onClick={() => handleNavigate("/Admin_Dashboard/Reports_page")} className="hover:text-yellow-300">
            Reports
          </button>
          <button onClick={() => handleNavigate("/Admin_Dashboard/My_Data_Page")} className="hover:text-yellow-300">
            My Data
          </button>
          <button
            onClick={() => {
              console.log("Logout clicked");
            }}
            className="bg-white text-rose-500 rounded px-3 py-1 mt-2 hover:bg-yellow-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

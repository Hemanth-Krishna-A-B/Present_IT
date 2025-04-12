"use client";

import { useRouter } from "next/navigation";
import { useRealtime } from "@/context/RealtimeContext";

export default function TopBar() {
  const router = useRouter();
  const { supabase, channelRef, setPresenting, setSessionCode } = useRealtime();

  const handleLogout = async () => {
    if (channelRef.current) {
      await supabase.removeChannel(channelRef.current);
      channelRef.current = null;
      console.log("Channel unsubscribed on logout.");
    }

    localStorage.removeItem("session_id");
    localStorage.removeItem("user_id");
    setPresenting(false);
    setSessionCode(null);

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    }

    router.replace("/");
  };

  return (
    <div className="h-14 bg-blue-500 w-full flex items-center justify-between px-6 shadow-md">
      <div className="text-white font-bold text-lg tracking-wide">PRESENT_IT</div>

      <div className="flex gap-20 text-white font-semibold text-sm sm:text-base">
        <button
          onClick={() => router.push("/Admin_Dashboard")}
          className="hover:text-yellow-300 transition"
        >
          Home
        </button>
        <button
          onClick={() => router.push("/Admin_Dashboard/Create_Page")}
          className="hover:text-yellow-300 transition"
        >
          Create Resources
        </button>
        <button
          onClick={() => router.push("/Admin_Dashboard/Reports_page")}
          className="hover:text-yellow-300 transition"
        >
          Reports
        </button>
        <button
          onClick={() => router.push("/Admin_Dashboard/My_Data_Page")}
          className="hover:text-yellow-300 transition"
        >
          My Data
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="bg-white text-rose-500 font-semibold px-4 py-1 rounded hover:bg-yellow-200 transition"
      >
        Logout
      </button>
    </div>
  );
}

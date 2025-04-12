"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Maximize2, X } from "lucide-react";
import { useRealtime } from "@/context/RealtimeContext";

export default function StudentHomePage() {
  const hasImage = true;
  const imageUrl = "https://t4.ftcdn.net/jpg/03/17/25/45/360_F_317254576_lKDALRrvGoBr7gQSa1k4kJBx7O2D15dc.jpg";
  const questions = [];

  const [showFullImage, setShowFullImage] = useState(false);
  const router = useRouter();

  // Use the RealtimeContext to access the channelRef and functions
  const { channelRef, unsubscribeChannel, sessionCode, presenceKey } = useRealtime();

  const handleLogout = async () => {
    // If the user is subscribed to a channel
    if (channelRef.current) {
      try {
        // Optionally broadcast a leave event
        await channelRef.current.send({
          type: "broadcast",
          event: "update",
          payload: {
            type: "leave",
            timestamp: new Date().toISOString(),
            sessionCode, // You can also include more session-related data here
            presenceKey,  // Include student's registration number if needed
          },
        });

        // Unsubscribe from the channel
        unsubscribeChannel();
        console.log("👋 Student left the channel.");
      } catch (err) {
        console.error("Error leaving channel:", err);
      }
    }

    // Clear any session or student info (localStorage, etc.)
    localStorage.removeItem("student_session_id");
    localStorage.removeItem("reg_no");

    // Redirect to home page after logout
    router.replace("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ===== Navbar ===== */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Present_IT</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-red-500 hover:text-red-600 transition font-medium"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </nav>

      {/* ===== Main Content ===== */}
      <div className="flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-4xl space-y-6">
          {/* ===== Image Preview ===== */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 relative">
            <div className="h-48 sm:h-56 md:h-64 flex items-center justify-center text-gray-400 text-lg font-medium">
              {hasImage ? (
                <div className="relative w-full h-full flex justify-center items-center">
                  <img
                    src={imageUrl}
                    alt="Question Preview"
                    className="object-contain h-full"
                  />
                  <button
                    onClick={() => setShowFullImage(true)}
                    className="absolute bottom-2 right-2 bg-white bg-opacity-80 px-3 py-1 rounded-full text-sm text-blue-600 hover:bg-blue-50 shadow"
                  >
                    <Maximize2 className="inline-block w-4 h-4 mr-1" />
                    View Fullscreen
                  </button>
                </div>
              ) : (
                <span>😎 No image? Chill, enjoy the moment!</span>
              )}
            </div>
          </div>

          {/* ===== Question Section ===== */}
          <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 border border-gray-200">
            {questions.length > 0 ? (
              <>
                <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">
                  {questions[0].title}
                </h2>
                <div className="space-y-3">
                  {questions[0].options.map((option, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left px-4 py-2 rounded-md border text-sm sm:text-base hover:bg-blue-50 transition duration-200"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center text-gray-500 text-sm sm:text-base">
                🧠 Good news — no questions right now! Maybe it’s nap time?
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ===== Fullscreen Image Modal ===== */}
      {showFullImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center">
          <button
            onClick={() => setShowFullImage(false)}
            className="absolute top-4 right-4 bg-white text-black p-2 rounded-full shadow"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={imageUrl}
            alt="Fullscreen Preview"
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </div>
  );
}

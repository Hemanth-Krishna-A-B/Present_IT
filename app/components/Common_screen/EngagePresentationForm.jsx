"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRealtime } from "@/context/RealtimeContext";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function EngagePresentationForm() {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [presentationCode, setPresentationCode] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const { channelRef, setSessionCode } = useRealtime();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true); // Start loading indicator

    if (!registrationNumber || !rollNumber || !presentationCode) {
      setIsLoading(false);
      return setError("All fields are required.");
    }

    try {
      const res = await fetch("/api/get_engaged", {
        method: "POST",
        body: JSON.stringify({
          registration_number: registrationNumber,
          roll_number: rollNumber,
          presentation_code: presentationCode,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        localStorage.setItem("student_session_id", presentationCode);
        localStorage.setItem("reg_no", registrationNumber);

        setSuccessMessage("Successfully joined the presentation!");

        const newChannel = supabase.channel(presentationCode, {
          config: {
            presence: {
              key: rollNumber || registrationNumber,
            },
          },
        });

        newChannel
          .on("presence", { event: "sync" }, () => {
            const state = newChannel.presenceState();
            console.log("Current participants:", state);
          })
          .on("broadcast", { event: "update" }, (payload) => {
            console.log("Received broadcast:", payload.payload);
          });

        await newChannel.subscribe(async (status) => {
          if (status === "SUBSCRIBED") {
            console.log(`✅ Joined channel: session-${presentationCode}`);

            await newChannel.send({
              type: "broadcast",
              event: "update",
              payload: {
                type: "join",
                registration_number: registrationNumber,
                roll_number: rollNumber,
                timestamp: new Date().toISOString(),
              },
            });
          }
        });

        // Save to context
        channelRef.current = newChannel;
        setSessionCode(presentationCode);

        router.push("/Student_Dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Try again.");
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md text-center text-xs text-gray-500">
      <h2 className="text-lg font-semibold text-blue-600 mb-4">Engage in Presentation</h2>

      <form className="flex flex-col gap-3 items-center text-sm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Registration Number"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          className="w-full max-w-xs p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          className="w-full max-w-xs p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Presentation Code"
          value={presentationCode}
          onChange={(e) => setPresentationCode(e.target.value)}
          className="w-full max-w-xs p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className={`mt-2 w-full max-w-xs ${isLoading ? "bg-gray-400" : "bg-blue-500"} text-white py-2 rounded-md hover:bg-blue-600 transition`}
          disabled={isLoading} // Disable button during loading
        >
          {isLoading ? "Loading..." : "Get Presentation"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-500 text-xs">{error}</p>}
      {successMessage && <p className="mt-4 text-green-600 text-xs">{successMessage}</p>}

      <p className="mt-6 text-gray-400">© 2025 Present_IT. All rights reserved.</p>
    </div>
  );
}

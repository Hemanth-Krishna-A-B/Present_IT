"use client";
import { useEffect } from "react";
import { useRealtime } from "@/context/RealtimeContext";

export default function SidebarButtons() {
  const {
    supabase,
    channelRef,
    presenting,
    setPresenting,
    sessionCode,
    setSessionCode,
  } = useRealtime();

  const handlePresentClick = async () => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) return console.error("User ID not found.");

    if (presenting) {
      // STOP presenting
      const session_id = localStorage.getItem("session_id");
      const { error } = await supabase
        .from("session_data")
        .update({ isActive: false })
        .eq("session_id", session_id);

      if (error) {
        console.error("Failed to stop presentation:", error.message);
      } else {
        if (channelRef.current) {
          await supabase.removeChannel(channelRef.current);
          channelRef.current = null;
          console.log("📴 Channel unsubscribed.");
        }

        setPresenting(false);
        setSessionCode(null);
        localStorage.removeItem("session_id");
      }
    } else {
      // START presenting
      const randomCode = Math.floor(1000 + Math.random() * 9000);

      const { error } = await supabase.from("session_data").insert([
        {
          session_id: randomCode,
          user_id: user_id,
          created_at: new Date().toISOString(),
          is_leaderboard: false,
          no_of_user: 0,
          present_id: null,
          poll_id: null,
          question_bank_id: null,
          timeout: 3,
          isActive: true,
        },
      ]);

      if (error) {
        console.error("Failed to start presentation:", error.message);
        return;
      }

      localStorage.setItem("session_id", randomCode);
      setSessionCode(randomCode);
      setPresenting(true);

      const channel = supabase.channel(`session_${randomCode}`, {
        config: {
          broadcast: { self: true },
          presence: { key: user_id },
        },
      });

      channelRef.current = channel;

      channel
        .on("broadcast", { event: "update" }, (payload) => {
          const { type, registration_number, roll_number, timestamp } = payload.payload;

          if (type === "join") {
            console.log(
              `🎓 Student joined: ${
                roll_number || registration_number
              } at ${new Date(timestamp).toLocaleTimeString()}`
            );
          }
        })
        .subscribe((status) => {
          console.log("🔌 Channel status:", status);
        });
    }
  };

  // Auto-restore on refresh
  useEffect(() => {
    const restore = async () => {
      const session_id = localStorage.getItem("session_id");
      const user_id = localStorage.getItem("user_id");

      if (session_id && !presenting) {
        setPresenting(true);
        setSessionCode(session_id);

        const channel = supabase.channel(`session_${session_id}`, {
          config: {
            broadcast: { self: true },
            presence: { key: user_id },
          },
        });

        channelRef.current = channel;

        channel
          .on("broadcast", { event: "update" }, (payload) => {
            const { type, registration_number, roll_number, timestamp } = payload.payload;

            if (type === "join") {
              console.log(
                `🎓 Student joined (restored): ${
                  roll_number || registration_number
                } at ${new Date(timestamp).toLocaleTimeString()}`
              );
            }
          })
          .subscribe((status) => {
            console.log("🔁 Restored channel:", status);
          });
      }
    };

    restore();
  }, []);

  return (
    <div className="flex flex-col gap-3 p-2">
      <button
        className={`px-4 py-2 rounded text-white font-semibold text-sm shadow-md transition ${
          presenting ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
        }`}
        onClick={handlePresentClick}
      >
        {presenting ? `Stop ${sessionCode}` : "Present It"}
      </button>
    </div>
  );
}

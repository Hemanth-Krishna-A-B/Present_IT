// context/RealtimeContext.js
"use client";
import { createContext, useContext, useRef, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const RealtimeContext = createContext();

export const RealtimeProvider = ({ children }) => {
  const channelRef = useRef(null);
  const [presenting, setPresenting] = useState(false);
  const [sessionCode, setSessionCode] = useState(null);
  const [presenceKey, setPresenceKey] = useState(null); // student reg/roll

  const subscribeToChannel = (code, key) => {
    if (channelRef.current) return;

    const channel = supabase.channel(code, {
      config: {
        presence: {
          key: key || "guest",
        },
      },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        console.log("📡 Presence state:", state);
      })
      .on("broadcast", { event: "update" }, (payload) => {
        console.log("📢 Broadcast received:", payload.payload);
      });

    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        console.log(`✅ Subscribed to session: ${code}`);
      }
    });

    channelRef.current = channel;
    setSessionCode(code);
    if (key) setPresenceKey(key);
  };

  const unsubscribeChannel = () => {
    if (channelRef.current) {
      channelRef.current.unsubscribe();
      console.log("🔌 Channel unsubscribed");
      channelRef.current = null;
      setSessionCode(null);
      setPresenceKey(null);
    }
  };

  // On unmount cleanup (in case Provider is ever unmounted)
  useEffect(() => {
    return () => {
      unsubscribeChannel();
    };
  }, []);

  return (
    <RealtimeContext.Provider
      value={{
        supabase,
        channelRef,
        presenting,
        setPresenting,
        sessionCode,
        setSessionCode,
        presenceKey,
        setPresenceKey,
        subscribeToChannel,
        unsubscribeChannel,
      }}
    >
      {children}
    </RealtimeContext.Provider>
  );
};

export const useRealtime = () => useContext(RealtimeContext);

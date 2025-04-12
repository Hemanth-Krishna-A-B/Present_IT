import { useEffect, useState } from "react";

export default function BottomPanel() {
  const [showPolls, setShowPolls] = useState(false);
  const [sharedItemId, setSharedItemId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [polls, setPolls] = useState([]);

  const user_id = typeof window !== "undefined" ? localStorage.getItem("user_id") : null;
  const currentItems = showPolls ? polls : questions;

  const toggleShare = async (id, type) => {
    setSharedItemId((prev) => (prev === id ? null : id));

    // Get the session_id from localStorage
    const session_id = typeof window !== "undefined" ? localStorage.getItem("session_id") : null;
    if (!session_id) return;

    // Prepare the data for the API request
    const requestBody = {
      type,
      id,
      session_id,
    };

    try {
      // Call the API to update the session data
      const res = await fetch("/api/update_shared_content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await res.json();
      if (res.ok) {
        console.log("Session updated successfully", result);
      } else {
        console.error("Error updating session", result.error);
      }
    } catch (error) {
      console.error("Error making request", error);
    }
  };

  useEffect(() => {
    if (!user_id) return;

    const fetchQuestions = async () => {
      const res = await fetch("/api/get_question_data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id }),
      });
      const { questions } = await res.json();
      setQuestions(questions || []);
    };

    const fetchPolls = async () => {
      const res = await fetch("/api/get_poll_data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id }),
      });
      const { polls } = await res.json();
      setPolls(polls || []);
    };

    fetchQuestions();
    fetchPolls();
  }, [user_id]);

  return (
    <div className="h-full w-full text-black bg-white p-0 overflow-hidden">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 bg-white z-10 p-2 border-b border-gray-300">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold">{showPolls ? "Polls" : "Questions"}</h2>
          <label className="flex items-center gap-1 cursor-pointer">
            <span className="text-xs font-medium m-1">Questions</span>
            <div
              className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 transition ${
                showPolls ? "justify-end" : "justify-start"
              }`}
              onClick={() => {
                setShowPolls(!showPolls);
                setSharedItemId(null);
              }}
            >
              <div className="w-3 h-3 bg-black rounded-full transition" />
            </div>
            <span className="text-xs font-medium m-1">Polls</span>
          </label>
        </div>
      </div>

      {/* Scrollable List */}
      <ul
        className="space-y-1 text-sm p-2 overflow-y-auto h-[calc(100%-42px)]"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style jsx>{`
          ul::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {currentItems.length === 0 ? (
          <li className="text-center text-gray-400">No items found</li>
        ) : (
          currentItems.map((item, index) => {
            const id = item.bank_id || item.poll_id;
            const label = item.title || item.question;
            const type = item.bank_id ? "question" : "poll";
            return (
              <li
                key={`${id}-${index}`}
                className="flex justify-between items-center bg-black text-white p-1 px-2 rounded shadow hover:bg-gray-800 transition"
              >
                <span className="truncate">{label}</span>
                <button
                  onClick={() => toggleShare(id, type)}
                  className={`ml-2 text-xs font-semibold px-2 py-1 rounded ${
                    sharedItemId === id ? "bg-red-400" : "bg-blue-500"
                  }`}
                >
                  {sharedItemId === id ? "Stop" : "Share"}
                </button>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

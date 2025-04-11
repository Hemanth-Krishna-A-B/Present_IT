import { useState } from "react";

export default function BottomPanel() {
  const [showPolls, setShowPolls] = useState(false);
  const [sharedItemId, setSharedItemId] = useState(null);

  const questions = [
    { id: 1, text: "What is your favorite programming language?" },
    { id: 2, text: "Explain the Go-Back-N protocol." },
    { id: 3, text: "What's your project topic?" },
    { id: 4, text: "Can you describe Selective Repeat?" },
    { id: 5, text: "What's the difference between TCP and UDP?" },
  ];

  const polls = [
    { id: 6, text: "Which protocol do you prefer?" },
    { id: 7, text: "Is Go-Back-N reliable?" },
    { id: 8, text: "Ready for the demo?" },
    { id: 9, text: "Are link-state protocols efficient?" },
    { id: 10, text: "Vote: Team Dark or Light Mode?" },
  ];

  const currentItems = showPolls ? polls : questions;

  const toggleShare = (id) => {
    setSharedItemId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="h-full w-full text-black bg-white  p-0 overflow-hidden">
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
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE 10+
        }}
      >
        <style jsx>{`
          ul::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {currentItems.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-black text-white p-1 px-2 rounded shadow hover:bg-gray-800 transition"
          >
            <span className="truncate">{item.text}</span>
            <button
              onClick={() => toggleShare(item.id)}
              className={`ml-2 text-xs font-semibold px-2 py-1 rounded ${
                sharedItemId === item.id ? "bg-red-400" : "bg-blue-500"
              }`}
            >
              {sharedItemId === item.id ? "Stop" : "Share"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useState } from "react";

export default function RightTop() {
  const questions = [
    "REG2025011",
    "REG2025012",
    "REG2025013",
    "REG2025014",
    "REG2025015",
    "REG2025016",
    "REG2025017",
    "REG2025018",
  ];

  const polls = [
    "REG2026001",
    "REG2026002",
    "REG2026003",
    "REG2026004",
    "REG2026005",
  ];

  const [showPolls, setShowPolls] = useState(false);
  const currentList = showPolls ? polls : questions;

  return (
    <div className="h-full w-full overflow-auto  bg-white r hide-scrollbar">
      {/* Sticky Header with Toggle in Column */}
      <div className="sticky top-0 bg-white  pb-2">
        <div className="flex flex-col items-center ">
          <h2 className="text-md font-semibold text-black text-center">LeaderBoard</h2>
          <label className="flex items-center gap-1 text-xs font-medium text-black mt-1">
            Questions
            <div
              className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${showPolls ? "justify-end" : "justify-start"
                }`}
              onClick={() => setShowPolls(!showPolls)}
            >
              <div className="w-3 h-3 bg-black rounded-full transition" />
            </div>
            Polls
          </label>
        </div>
      </div>

      {/* List */}
      <div className="pt-2">
        {currentList.length === 0 ? (
          <p className="text-center text-sm text-gray-400">None</p>
        ) : (
          <ul className="space-y-2">
            {currentList.map((reg, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-900 rounded px-3 py-2 hover:bg-gray-800 transition text-white"
              >
                <span className="truncate">{reg}</span>
                <div className="flex space-x-1">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold bg-green-500">
                    1
                  </div>
                  <div className="w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold bg-red-500">
                    2
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Hide scrollbar but allow scroll */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

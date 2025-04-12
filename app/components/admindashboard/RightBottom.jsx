import { useState } from "react";

export default function RightBottom() {
  const [timer, setTimer] = useState("3"); // Default: 3 minutes
  const [inputTimer, setInputTimer] = useState("");

  // Example data
  const totalUsers = 0;
  const questionResponses = 0;
  const pollResponses = 0;

  const handleSetTimer = () => {
    if (inputTimer) {
      setTimer(inputTimer);
      setInputTimer("");
    }
  };

  return (
    <div className=" h-full w-full text-black rounded-lg space-y-4 p-3 font-medium text-sm">
      {/* Timer Section */}
      <div>
        <label className="block mb-2 text-base">
          Current Timer: <span className="font-bold">{timer} min</span>
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={inputTimer}
            onChange={(e) => setInputTimer(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200 text-sm shadow-inner placeholder-gray-400"
            placeholder="Enter minutes"
          />
          <button
            onClick={handleSetTimer}
            className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm font-semibold shadow-md"
          >
            Set
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className=" rounded-xl p-3 space-y-2 text-sm shadow-inner">
        <div className="flex justify-between">
          <span>Total Users</span>
          <span className="font-bold">{totalUsers}</span>
        </div>
        <div className="flex justify-between">
          <span>Questions Responded</span>
          <span className="font-bold">{questionResponses}</span>
        </div>
        <div className="flex justify-between">
          <span>Polls Responded</span>
          <span className="font-bold">{pollResponses}</span>
        </div>
      </div>
    </div>
  );
}

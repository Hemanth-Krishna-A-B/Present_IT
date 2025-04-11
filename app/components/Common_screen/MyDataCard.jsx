"use client";
import { useState } from "react";

export default function MyDataCard() {
  const [filter, setFilter] = useState("all");

  const [items, setItems] = useState([
    {
      id: 1,
      type: "presentation",
      title: "React Basics",
      description: "Introduction to React and JSX.",
      details: "Covers components, props, and hooks in-depth.",
    },
    {
      id: 2,
      type: "question",
      title: "Quiz: JS Loops",
      description: "Multiple choice questions on loops.",
      details: "Includes for, while, do-while loop based questions.",
    },
    {
      id: 3,
      type: "poll",
      title: "Topic Preference",
      description: "Poll on preferred topic for next session.",
      details: "Choices were: Redux, TypeScript, Firebase.",
    },
    {
      id: 4,
      type: "presentation",
      title: "Next.js Routing",
      description: "Presentation about pages and layouts in Next.js",
      details: "Explains app vs pages directory routing system.",
    },
  ]);

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const filteredItems =
    filter === "all" ? items : items.filter((item) => item.type === filter);

  return (
    <div className="p-6 bg-white text-gray-800 ">
      <h2 className="text-2xl font-bold mb-4 text-center">My Data</h2>

      {/* Filter Dropdown */}
      <div className="mb-6 flex justify-end">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="presentation">Presentations</option>
          <option value="question">Questions</option>
          <option value="poll">Polls</option>
        </select>
      </div>

      {/* Content List */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scroll">
        {filteredItems.length === 0 ? (
          <p className="text-center text-gray-500">No data found for selected type.</p>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="relative border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition group overflow-hidden"
            >
              <div className="flex justify-between items-start z-10 relative">
                <div>
                  <p className="font-semibold text-lg">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>

              {/* Hover Details Overlay */}
              <div className="absolute inset-0 bg-white rounded-lg shadow-lg p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none">
                <p className="font-semibold mb-2 text-gray-800">Details:</p>
                <p className="text-sm text-gray-700">{item.details}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Hide Scrollbar (Webkit + Firefox) */}
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(100, 100, 100, 0.3);
          border-radius: 10px;
        }
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(100, 100, 100, 0.3) transparent;
        }
      `}</style>
    </div>
  );
}

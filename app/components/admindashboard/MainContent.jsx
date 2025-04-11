import { useState } from "react";

export default function MainContent() {
  const [sharedItem, setSharedItem] = useState(null);

  const items = [
    { id: 1, title: "First Item" },
    { id: 2, title: "Second Item" },
    { id: 3, title: "Third Item" },
  ];

  return (
    <div className="h-full w-full text-black font-semibold text-base p-4 overflow-auto bg-white border-2">
      {sharedItem === null ? (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border border-gray-300 p-3 rounded shadow-sm"
            >
              <span>{item.title}</span>
              <button
                onClick={() => setSharedItem(item)}
                className="bg-rose-500 text-white font-medium px-3 py-1 rounded hover:bg-rose-600 transition"
              >
                Share
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl">Sharing: {sharedItem.title}</h2>
          <div className="p-4 border border-gray-300 rounded bg-gray-50">
            Share this awesome item with your friends!
          </div>
          <button
            onClick={() => setSharedItem(null)}
            className="bg-black text-white font-medium px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

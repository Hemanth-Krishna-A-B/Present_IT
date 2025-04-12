"use client";
import { useEffect, useState, useCallback } from "react";

export default function MyDataCard() {
  const [filter, setFilter] = useState("all");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch function wrapped in useCallback to reuse it
  const fetchData = useCallback(async () => {
    setLoading(true);
    const user_id = localStorage.getItem("user_id");

    if (!user_id) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/get_resource_data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id }),
      });

      const result = await res.json();
      if (res.ok) {
        setItems(result.data);
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id, type) => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) return;
  
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;
  
    try {
      const res = await fetch("/api/delete_resource_data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, type, id }),
      });
  
      const result = await res.json();
      if (res.ok) {
        await fetchData();
      } else {
        console.error("Delete failed:", result.error);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };
  

  const filteredItems =
    filter === "all" ? items : items.filter((item) => item.type === filter);

  return (
    <div className="p-6 bg-white text-gray-800">
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
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filteredItems.length === 0 ? (
          <p className="text-center text-gray-500">No materials created.</p>
        ) : (
          filteredItems.map((item, index) => {
            const itemId =
              item.presentation_id || item.poll_id || item.bank_id || item.id;
            const key = `${item.type}-${itemId || index}`;
            const title = item.title || item.question || "Untitled";
            const description = item.description || "";
            const details = item.details || description || item.type;

            return (
              <div
                key={key}
                className="relative border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition group overflow-hidden"
              >
                <div className="flex justify-between items-start z-10 relative">
                  <div>
                    <p className="font-semibold text-lg">{title}</p>
                    <p className="text-sm text-gray-600">{description}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(itemId, item.type)}
                    className="text-sm text-red-500 hover:underline z-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Scrollbar Styling */}
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

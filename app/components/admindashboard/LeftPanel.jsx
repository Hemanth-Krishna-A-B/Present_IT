"use client";

import { useEffect, useState } from "react";

export default function LeftPanel() {
  const [regNumbers, setRegNumbers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveStudents = async () => {
      const sessionId = localStorage.getItem("student_session_id");
      if (!sessionId) return;

      try {
        const res = await fetch("/api/get_active_students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId }),
        });

        const { students } = await res.json();
        if (students && Array.isArray(students)) {
          setRegNumbers(students.map((s) => s.reg_no));
        }
      } catch (err) {
        console.error("Failed to load active students:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveStudents();
  }, []);

  return (
    <div className="h-full w-full text-black bg-white overflow-auto p-2 rounded [&::-webkit-scrollbar]:hidden scrollbar-hide">
      <h2 className="text-sm font-semibold mb-3 border-b border-black pb-1">
        Active Students
      </h2>
      {loading ? (
        <p className="text-xs text-gray-400 text-center">Loading...</p>
      ) : regNumbers.length === 0 ? (
        <p className="text-xs text-gray-400 text-center">No active students</p>
      ) : (
        <ul className="space-y-2">
          {regNumbers.map((reg, index) => (
            <li
              key={index}
              className="text-black py-2 text-center rounded shadow hover:bg-gray-800 hover:text-white transition"
            >
              {reg.toUpperCase()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

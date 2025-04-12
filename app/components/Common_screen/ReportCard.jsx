"use client";
import { useEffect, useState } from "react";

export default function ReportCard() {
  const [searchDate, setSearchDate] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reports from API on mount
  useEffect(() => {
    const fetchReports = async () => {
      const user_id = localStorage.getItem("user_id");
      if (!user_id) {
        setReports([]);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/get_session_data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id }),
        });

        const result = await res.json();

        if (res.ok && result.reports) {
          setReports(result.reports);
        } else {
          setReports([]);
        }
      } catch (err) {
        console.error("Fetch failed:", err);
        setReports([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const filteredReports = searchDate
    ? reports.filter((r) => r.date === searchDate)
    : reports;

  const handleDownload = (report) => {
    const text = `Session ID: ${report.session_id}\nDate: ${report.date}\nStudents Attended: ${report.attended}\nDetails: ${report.details}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${report.session_id}_report.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md text-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-center">Session Reports</h2>

      {/* Search bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Report List */}
      <div className="space-y-4 max-h-[400px] overflow-auto hide-scrollbar">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filteredReports.length === 0 ? (
          <p className="text-gray-500 text-center">No sessions created by user.</p>
        ) : (
          filteredReports.map((report, index) => (
            <div
              key={index}
              className="relative border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition group"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">Session: {report.session_id}</p>
                  <p className="text-sm text-gray-600">Date: {report.date}</p>
                  <p className="text-sm text-gray-600">
                    Students Attended: {report.attended}
                  </p>
                </div>
                <button
                  onClick={() => handleDownload(report)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Download
                </button>
              </div>

              {/* Hover Popup as Card */}
              <div className="absolute z-20 top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-64">
                <div className="bg-white shadow-lg border p-4 rounded-lg text-sm text-gray-700">
                  <p className="font-semibold mb-1">Details:</p>
                  <p>{report.details}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Hide Scrollbar */}
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

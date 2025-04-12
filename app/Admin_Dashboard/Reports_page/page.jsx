"use client"

import ReportCard from "@/app/components/Common_screen/ReportCard";

export default function ReportsPage() {
    return (
      <div className="min-h-screen bg-gray-100 px-4 py-6">
        <div className="bg-white p-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Reports</h2>
  
          {/* Scrollable Container with Hidden Scrollbar */}
          <div className="border border-gray-200 rounded-md p-4 min-h-[200px] max-h-[500px] overflow-auto hide-scrollbar">
            <ReportCard/>
          </div>
        </div>
  
        {/* Tailwind-style hidden scrollbar */}
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
  
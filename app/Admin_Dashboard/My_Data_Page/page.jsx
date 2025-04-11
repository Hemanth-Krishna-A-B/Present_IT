"use client"

import MyDataCard from "@/app/components/Common_screen/MyDataCard";

export default function MyResources(){
    return (
      <div className="min-h-screen bg-gray-100 px-4 py-6">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Resources</h2>
  
          {/* Scrollable Container with Hidden Scrollbar */}
          <div className="border  p-4 min-h-[200px] max-h-[500px] overflow-auto hide-scrollbar">
            <MyDataCard/>
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
  
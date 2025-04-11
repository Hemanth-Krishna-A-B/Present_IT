"use client";
import PollUploadCard from "@/app/components/Common_screen/PollUploadCard";
import PresentationUploadCard from "@/app/components/Common_screen/PresentationUploadCard";
import QuestionUploadCard from "@/app/components/Common_screen/QuestionUploadCard";
import { useState } from "react";

export default function CreateResource() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sections = ["Questions", "Polls", "Presentations"];

  const renderSection = () => {
    switch (activeIndex) {
      case 0:
        return <QuestionUploadCard/>;
      case 1:
        return <PollUploadCard/>;
      case 2:
        return <PresentationUploadCard/>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-3xl mx-auto text-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Resource</h2>

        {/* Slider Switch */}
        <div className="flex justify-center mb-6">
          <div className="relative bg-black text-white rounded-full flex w-72 h-10 cursor-pointer">
            {sections.map((section, index) => (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className="flex-1 text-center z-10 flex items-center justify-center font-medium text-sm"
              >
                {section}
              </div>
            ))}

            <div
              className="absolute top-0 left-0 h-full w-1/3 bg-blue-600 rounded-full transition-transform duration-300"
              style={{ transform: `translateX(${activeIndex * 100}%)` }}
            />
          </div>
        </div>

        {/* Dynamic Section Content */}
        <div className="text-base">{renderSection()}</div>
      </div>
    </div>
  );
}

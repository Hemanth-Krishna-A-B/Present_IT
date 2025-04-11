"use client";

export default function EngagePresentationForm() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md text-center text-xs text-gray-500">
      {/* Title */}
      <h2 className="text-lg font-semibold text-blue-600 mb-4">Engage in Presentation</h2>

      {/* Form */}
      <form className="flex flex-col gap-3 items-center text-sm">
        <input
          type="text"
          placeholder="Registration Number"
          className="w-full max-w-xs p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Roll Number"
          className="w-full max-w-xs p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Presentation Code"
          className="w-full max-w-xs p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="mt-2 w-full max-w-xs bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Get Presentation
        </button>
      </form>

      {/* Footer text */}
      <p className="mt-6 text-gray-400">© 2025 Present_IT. All rights reserved.</p>
    </div>
  );
}

"use client";
import { useState } from "react";

export default function PresentationUploadCard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && (selected.type === "application/pdf" || selected.type.includes("presentation"))) {
      setFile(selected);
    } else {
      alert("Only PDF and PPT files are allowed.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !file) {
      alert("Please fill all fields and upload a valid file.");
      return;
    }
    // Handle form submission here
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("File:", file.name);
  };

  return (
    <div className="p-6 bg-white w-full max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Upload Presentation</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter presentation title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            rows={3}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a brief description"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload File (PDF/PPT)</label>
          <input
            type="file"
            accept=".pdf, .ppt, .pptx, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation"
            onChange={handleFileChange}
            className="mt-1 w-full"
          />
          {file && (
            <p className="text-sm mt-1 text-green-600">Selected: {file.name}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}

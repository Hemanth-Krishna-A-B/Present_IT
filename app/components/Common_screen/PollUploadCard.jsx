"use client";
import { useState } from "react";

export default function PollUploadCard() {
  const [poll, setPoll] = useState({
    question: "",
    options: ["", "", "", ""],
    image: null,
    preview: null,
  });

  const handleQuestionChange = (value) => {
    setPoll((prev) => ({ ...prev, question: value }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...poll.options];
    updatedOptions[index] = value;
    setPoll((prev) => ({ ...prev, options: updatedOptions }));
  };

  const handleImageUpload = (file) => {
    const preview = file ? URL.createObjectURL(file) : null;
    setPoll((prev) => ({ ...prev, image: file, preview }));
  };
  
  



  const handleSubmit = async () => {
    // Basic validation
    if (!poll.question.trim()) {
      alert("Poll question is required.");
      return;
    }
  
    const hasEmptyOption = poll.options.some((opt) => !opt.trim());
    if (hasEmptyOption) {
      alert("All poll options must be filled.");
      return;
    }
  
    // Proceed with form submission
    const formData = new FormData();
    formData.append("user_id",localStorage.getItem("user_id"));
    formData.append("question", poll.question);
    poll.options.forEach((opt, i) => {
      formData.append(`options[${i}]`, opt);
    });
  
    if (poll.image) {
      formData.append("image", poll.image);
    }
    
    try {
      const res = await fetch("/api/upload_polls", {
        method: "POST",
        body: formData,
      });
  
      const result = await res.json();
  
      if (res.ok) {
        if (res.ok) {
          alert("Poll submitted successfully!");
          console.log("Poll ID:", result.poll_id);
          setPoll({
            question: "",
            options: ["", "", "", ""],
            image: null,
            preview: null,
          });
        }        
      } else {
        console.error("Error uploading poll:", result.message);
        alert("Poll upload failed.");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Something went wrong.");
    }
  };

  



  return (
    <div className="bg-white p-6  text-gray-800 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Create a Poll</h2>

      {/* Poll Question */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Poll Question</label>
        <textarea
          value={poll.question}
          onChange={(e) => handleQuestionChange(e.target.value)}
          rows={3}
          placeholder="Enter poll question here..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md resize-y"
        />
      </div>

      {/* Options */}
      <div className="space-y-3 mb-4">
        {poll.options.map((option, i) => (
          <div key={i}>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(i, e.target.value)}
              placeholder={`Option ${i + 1}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        ))}
      </div>

      {/* Optional Image Upload */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Optional Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            handleImageUpload(e.target.files ? e.target.files[0] : null)
          }
          className="w-full"
        />

        {poll.preview && (
          <div className="mt-3">
            <img
              src={poll.preview}
              alt="Poll image preview"
              className="max-w-full max-h-48 rounded-md border"
            />
          </div>
        )}
      </div>

      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Submit Poll
        </button>

      </div>
    </div>
  );
}

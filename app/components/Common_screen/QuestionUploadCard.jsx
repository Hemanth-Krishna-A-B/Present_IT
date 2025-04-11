"use client";
import { useState } from "react";

export default function QuestionUploadCard() {
  const [bankTitle, setBankTitle] = useState("");
  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""], correct: "", image: null, preview: null },
  ]);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleImageUpload = (index, file) => {
    const updated = [...questions];
    updated[index].image = file;
    updated[index].preview = file ? URL.createObjectURL(file) : null;
    setQuestions(updated);
  };

  const addNewQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", options: ["", "", "", ""], correct: "", image: null, preview: null },
    ]);
  };

  const deleteQuestion = (index) => {
    const updated = [...questions];
    if (updated[index].preview) {
      URL.revokeObjectURL(updated[index].preview);
    }
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleUpload = () => {
    const formatted = {
      title: bankTitle,
      questions: questions.map(({ preview, ...rest }) => rest),
    };

    console.log("Uploading Question Bank:", formatted);

    // You can replace this log with an API call to save to Supabase
    alert("Question Bank uploaded successfully!");
  };

  return (
    <div className="bg-white p-6 space-y-6 text-gray-800">
      <h2 className="text-2xl font-bold text-center mb-4">Upload Question Bank</h2>

      {/* Question Bank Title */}
      <div>
        <label className="block font-medium mb-1">Question Bank Title</label>
        <input
          type="text"
          value={bankTitle}
          onChange={(e) => setBankTitle(e.target.value)}
          placeholder="Enter a title for this question bank"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {questions.map((q, index) => (
        <div
          key={index}
          className="border border-gray-300 p-4 rounded-md space-y-4 relative"
        >
          {/* Question Text */}
          <div>
            <label className="block font-medium mb-1">Question {index + 1}</label>
            <textarea
              value={q.text}
              onChange={(e) => handleQuestionChange(index, "text", e.target.value)}
              placeholder="Enter question (multi-line supported)"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md resize-y"
            />
          </div>

          {/* Options */}
          <div className="space-y-2">
            {q.options.map((opt, i) => (
              <input
                key={i}
                type="text"
                value={opt}
                onChange={(e) => handleOptionChange(index, i, e.target.value)}
                placeholder={`Option ${i + 1}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            ))}
          </div>

          {/* Correct Answer Dropdown */}
          <div>
            <label className="block font-medium mt-2">Correct Answer</label>
            <select
              value={q.correct}
              onChange={(e) => handleQuestionChange(index, "correct", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Correct Answer</option>
              {q.options.map((opt, i) => (
                <option key={i} value={opt}>
                  Option {i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Optional Image Upload */}
          <div>
            <label className="block font-medium mt-2">Optional Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImageUpload(index, e.target.files ? e.target.files[0] : null)
              }
              className="w-full"
            />

            {q.preview && (
              <div className="mt-3">
                <img
                  src={q.preview}
                  alt={`Question ${index + 1} image preview`}
                  className="max-w-full max-h-48 rounded-md border"
                />
              </div>
            )}
          </div>

          {/* Delete Button */}
          <button
            onClick={() => deleteQuestion(index)}
            className="absolute top-2 right-2 text-sm text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      ))}

      {/* Add New Question */}
      <div className="text-center space-y-4">
        <button
          onClick={addNewQuestion}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          + Add New Question
        </button>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="ml-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Upload Question Bank
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    class_name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful! Please check Your Email for Verification");
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        name="username"
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        name="class_name"
        type="text"
        placeholder="Class Name"
        value={formData.class_name}
        onChange={handleChange}
        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        Sign Up
      </button>
    </form>
  );
}

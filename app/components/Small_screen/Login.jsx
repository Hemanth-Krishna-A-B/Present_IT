"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    class_name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data: authUser, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert("Login failed: " + error.message);
      return;
    }

    const { data: userInfo, error: classError } = await supabase
      .from("users")
      .select("class_name")
      .eq("id", authUser.user.id)
      .single();

    if (classError || userInfo.class_name !== formData.class_name) {
      alert("Class name does not match.");
      return;
    }

    localStorage.setItem("user_id",authUser.user.id);
    alert("Login successful!");
    router.push("/Admin_Dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="text-neutral-600 flex flex-col gap-3">
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="p-3 border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
        Login
      </button>
    </form>
  );
}

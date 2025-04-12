import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  const { user_id } = await req.json();

  if (!user_id) {
    return NextResponse.json({ message: "Missing user_id" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("session_data")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ message: "Failed to fetch session data" }, { status: 500 });
  }

  return NextResponse.json({ reports: data }, { status: 200 });
}

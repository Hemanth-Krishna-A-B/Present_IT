import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key for write access
);

export async function POST(req) {
  try {
    const { title, description, user_id, image_urls } = await req.json();

    // Basic validation
    if (!title || !description || !user_id || !Array.isArray(image_urls)) {
      return NextResponse.json({ message: "Missing or invalid fields." }, { status: 400 });
    }

    // Insert into Supabase
    const { data, error } = await supabase.from("presentation").insert([
      {
        title,
        description,
        user_id,
        image_url: image_urls,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ message: "Failed to insert into database." }, { status: 500 });
    }

    return NextResponse.json({ message: "Presentation saved successfully.", data }, { status: 200 });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}

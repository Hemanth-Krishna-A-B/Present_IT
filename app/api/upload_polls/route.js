import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  const formData = await req.formData();

  const user_id = formData.get("user_id");
  const question = formData.get("question");
  const image = formData.get("image");

  const options = [
    formData.get("options[0]"),
    formData.get("options[1]"),
    formData.get("options[2]"),
    formData.get("options[3]"),
  ];

  // Validate required fields
  if (!user_id || !question || options.some((opt) => !opt)) {
    return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
  }

  let image_url = null;

  if (image && typeof image.name === "string") {
    const filePath = `polls/${Date.now()}-${image.name}`;

    const { error: uploadError } = await supabase.storage
      .from("poll-images")
      .upload(filePath, image, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Image upload failed:", uploadError.message);
      return NextResponse.json({ message: "Image upload failed." }, { status: 500 });
    }

    image_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/poll-images/${filePath}`;
  }

  // Insert poll into database
  const { data, error } = await supabase.from("polls").insert([
    {
      question,
      options,
      image_url,
      user_id,
    },
  ]).select("poll_id").single();

  if (error) {
    console.error("Insert failed:", error.message);
    return NextResponse.json({ message: "Poll insert failed." }, { status: 500 });
  }

  return NextResponse.json({ poll_id: data.poll_id }, { status: 200 });
}

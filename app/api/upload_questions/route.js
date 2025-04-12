import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  const formData = await req.formData();

  const title = formData.get("title");
  const user_id = formData.get("user_id");

  if (!title || !user_id) {
    return NextResponse.json(
      { message: "Title or User ID is missing." },
      { status: 400 }
    );
  }

  // Insert question bank and get bank_id
  const { data, error } = await supabase
    .from("question_bank")
    .insert([{ title, user_id }])
    .select("bank_id")
    .single();

  if (error) {
    return NextResponse.json(
      { message: "Failed to create question bank.", error: error.message },
      { status: 500 }
    );
  }

  const bank_id = data.bank_id;
  let index = 0;
  const insertedQuestions = [];

  while (formData.has(`questions[${index}][text]`)) {
    const text = formData.get(`questions[${index}][text]`);
    const options = [
      formData.get(`questions[${index}][options][0]`),
      formData.get(`questions[${index}][options][1]`),
      formData.get(`questions[${index}][options][2]`),
      formData.get(`questions[${index}][options][3]`),
    ];
    const correct = formData.get(`questions[${index}][correct]`);
    const image = formData.get(`questions[${index}][image]`) || null;

    let publicUrl = null;

    if (image && typeof image === "object") {
      const filePath = `images/${Date.now()}_${image.name}`;
      const { data: imgData, error: imgError } = await supabase.storage
        .from("images")
        .upload(filePath, image);

      if (imgError) {
        console.error(`Image upload failed for question ${index}:`, imgError.message);
      } else {
        publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${filePath}`;
      }
    }

    insertedQuestions.push({
      bank_id,
      question: text,
      options,
      correct_answer: correct,
      image_url: publicUrl,
    });

    index++;
  }

  // Insert all questions at once
  const { error: insertError } = await supabase
    .from("questions")
    .insert(insertedQuestions);

  if (insertError) {
    return NextResponse.json(
      { message: "Failed to insert questions.", error: insertError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ bank_id });
}

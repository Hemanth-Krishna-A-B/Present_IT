import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const { user_id } = await req.json();

    if (!user_id) {
      return new Response(
        JSON.stringify({ error: "Missing user_id" }),
        { status: 400 }
      );
    }

    const [presentations, questions, polls] = await Promise.all([
      supabase
        .from("presentation")
        .select("presentation_id , title, description, image_url")
        .eq("user_id", user_id),
      supabase
        .from("question_bank")
        .select("bank_id , title")
        .eq("user_id", user_id),
      supabase
        .from("polls")
        .select("poll_id , question,image_url")
        .eq("user_id", user_id),
    ]);

    if (presentations.error || questions.error || polls.error) {
      return new Response(
        JSON.stringify({
          error:
            presentations.error?.message ||
            questions.error?.message ||
            polls.error?.message,
        }),
        { status: 500 }
      );
    }

    const formatItem = (item, type) => ({
      ...item,
      type,
    });

    const data = [
      ...presentations.data.map((item) => formatItem(item, "presentation")),
      ...questions.data.map((item) => formatItem(item, "question")),
      ...polls.data.map((item) => formatItem(item, "poll")),
    ];

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}

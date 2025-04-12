import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const body = await req.json();
    const { user_id } = body;

    if (!user_id) {
      return new Response(
        JSON.stringify({ error: "Missing user_id in request body" }),
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("polls")
      .select("*")
      .eq("user_id", user_id);

    if (error) {
      console.error("Error fetching poll data:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch poll data" }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ polls: data }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Internal server error", detail: err.message }),
      { status: 500 }
    );
  }
}

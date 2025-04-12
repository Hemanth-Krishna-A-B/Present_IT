import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const body = await req.json();
    const { session_id } = body;

    if (!session_id) {
      return new Response(
        JSON.stringify({ error: "Missing session_id" }),
        { status: 400 }
      );
    }

    // Join session_student with student to get reg_no and roll_no
    const { data, error } = await supabase
      .from("session_student")
      .select("student:student_id(reg_no, roll_no)")
      .eq("session_id", session_id);

    if (error) {
      console.error("Supabase error:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500 }
      );
    }

    // Extract student info cleanly
    const students = data.map(entry => entry.student);

    return new Response(
      JSON.stringify({ students }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("Server error:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: err.message }),
      { status: 500 }
    );
  }
}

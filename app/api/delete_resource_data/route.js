import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const { user_id, type, id } = await req.json();

    if (!user_id || !type || !id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Define table and ID column name based on resource type
    let tableName = "";
    let idColumn = "";

    if (type === "presentation") {
      tableName = "presentation";
      idColumn = "presentation_id";
    } else if (type === "question") {
      tableName = "question_bank";
      idColumn = "bank_id";
    } else if (type === "poll") {
      tableName = "polls";
      idColumn = "poll_id";
    } else {
      return NextResponse.json({ error: "Invalid resource type" }, { status: 400 });
    }

    // Perform deletion with user_id verification
    const { error } = await supabase
      .from(tableName)
      .delete()
      .match({ [idColumn]: id, user_id });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

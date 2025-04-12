import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  // Parse the incoming request body
  const { registration_number, roll_number, presentation_code } = await request.json();

  // Validate input fields
  if (!registration_number || !roll_number || !presentation_code) {
    return new Response(
      JSON.stringify({ error: "All fields are required." }),
      { status: 400 }
    );
  }

  // Check if the presentation/session is active
  const { data: sessionData, error: sessionError } = await supabase
    .from("session_data")
    .select("*")
    .eq("session_id", presentation_code)
    .eq("isActive", true)
    .single();

  if (sessionError || !sessionData) {
    console.error("Error fetching session data:", sessionError);
    return new Response(
      JSON.stringify({ error: "Invalid or inactive presentation code." }),
      { status: 404 }
    );
  }

  // Ensure registration_number is a string for consistency
  const registration_number_str = String(registration_number);

  // Query the student table to check if the student already exists
  const { data: studentd, error: studentError } = await supabase
    .from("student")
    .select("*")
    .eq("reg_no", registration_number_str)
    .limit(1);

  if (studentError) {
    console.error("Error checking student data:", studentError);
    return new Response(
      JSON.stringify({ error: "Error checking student data." }),
      { status: 500 }
    );
  }

  // If student doesn't exist, insert them into the student table
  if (!studentd || studentd.length === 0) {
    console.log(`No student found with registration number: ${registration_number_str}`);

    const { data: insertData, error: insertError } = await supabase
      .from("student")
      .insert([
        {
          reg_no: registration_number_str,
          roll_no: roll_number,
        },
      ]);

    if (insertError) {
      console.error("Error inserting student into database:", insertError);
      return new Response(
        JSON.stringify({ error: "Error inserting student into database." }),
        { status: 500 }
      );
    }

    console.log("Student inserted:", insertData);
  }

  // Insert the student into session_student table (with upsert to prevent duplicates)
  const { data: studentData, error: studentInsertError } = await supabase
    .from("session_student")
    .upsert(
      [
        {
          session_id: presentation_code,  // Ensure session_id is BigInt
          student_id: registration_number_str,  // Ensure student_id is a string
        },
      ],
      { onConflict: ["session_id", "student_id"] } // Handle conflicts (duplicate entries)
    );

  if (studentInsertError) {
    console.error("Error inserting student into session:", studentInsertError);
    return new Response(
      JSON.stringify({ error: "Failed to join the session." }),
      { status: 500 }
    );
  }

  // Return success response with session data
  return new Response(
    JSON.stringify({ success: true, session: sessionData }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

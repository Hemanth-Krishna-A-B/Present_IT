import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const { type, id, session_id } = await req.json();

    if (!type || !id || !session_id) {
      return new Response(
        JSON.stringify({ error: 'Missing parameters (type, id, session_id)' }),
        { status: 400 }
      );
    }

    let fieldToUpdate = null;

    // Determine the field to update based on the 'type'
    if (type === 'presentation') {
      fieldToUpdate = 'present_id';
    } else if (type === 'poll') {
      fieldToUpdate = 'poll_id';
    } else if (type === 'question') {
      fieldToUpdate = 'question_bank_id';
    } else {
      return new Response(
        JSON.stringify({ error: 'Invalid type' }),
        { status: 400 }
      );
    }

    // Perform the update on the session_data table
    const { data, error } = await supabase
      .from('session_data')
      .update({ [fieldToUpdate]: id })
      .eq('session_id', session_id);

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Session data updated successfully', data }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Server error' }),
      { status: 500 }
    );
  }
}

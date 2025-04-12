import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const { user_id } = await req.json();

    // Validate user_id presence
    if (!user_id) {
      return new Response(JSON.stringify({ error: 'user_id is missing' }), { status: 400 });
    }

    // Fetch presentations for the given user_id
    const { data, error } = await supabase
      .from('presentation')
      .select('*')
      .eq('user_id', user_id);

    // If there is an error, return the error message
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    // Successfully fetched presentations
    return new Response(JSON.stringify({ presentations: data }), { status: 200 });
  } catch (err) {
    // Log the error for debugging
    console.error('Error fetching presentations:', err);
    
    // Return a general server error response
    return new Response(JSON.stringify({ error: 'Server error occurred' }), { status: 500 });
  }
}

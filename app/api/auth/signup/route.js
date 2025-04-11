import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function POST(req) {
  const { email, password, username, class_name } = await req.json();

  const { data: authUser, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) return Response.json({ error: error.message }, { status: 400 });

  const userId = authUser.user?.id;


  const { error: insertError } = await supabase
    .from('users')
    .insert({ id: userId, email, username, class_name });

  if (insertError) return Response.json({ error: insertError.message }, { status: 500 });

  return Response.json({ message: 'Signup successful', user: authUser.user });
}

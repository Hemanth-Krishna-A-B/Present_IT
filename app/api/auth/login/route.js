import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function POST(req) {
  const { email, password, class_name } = await req.json();

  const { data: authUser, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return Response.json({ error: error.message }, { status: 401 });

  const userId = authUser.user?.id;

  const { data: userInfo, error: userError } = await supabase
    .from('users')
    .select('class_name')
    .eq('id', userId)
    .single();

  if (userError || userInfo.class_name !== class_name) {
    return Response.json({ error: 'Class name does not match' }, { status: 403 });
  }

  return Response.json({ message: 'Login successful', user: authUser.user });
}

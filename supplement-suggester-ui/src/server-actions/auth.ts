'use server';

import { createClient } from '@supabase/supabase-js';

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY || ''
);

const createUser = async (
  email: string
): Promise<{
  id: string | null;
  error: Error | null;
}> => {
  const { data, error } = await supabaseClient.auth.admin.createUser({
    email,
    email_confirm: false // Create the user without requiring immediate email verification
  });

  if (error) {
    return { id: null, error };
  }

  if (!data?.user?.id) {
    return { id: null, error: new Error('User ID not found') };
  }

  return { id: data?.user?.id, error: null };
};

const createMagicLink = async (email: string): Promise<{ error: Error | null }> => {
  const { error } = await supabaseClient.auth.signInWithOtp({ email });
  if (error) {
    return { error };
  }

  return { error: null };
};

export { createMagicLink, createUser };

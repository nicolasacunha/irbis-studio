import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Só usar em Server Components / Route Handlers / Server Actions.
// A service role key ignora RLS — nunca importar este arquivo em código de cliente.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

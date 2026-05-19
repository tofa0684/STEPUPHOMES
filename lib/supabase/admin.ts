import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { Database } from '../supabase-types'

// Note: This bypasses RLS. Never use in client code.
export function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

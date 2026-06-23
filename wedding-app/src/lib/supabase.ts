import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// Friendly guard so a missing .env shows a clear message instead of a blank page.
export const isConfigured = Boolean(url && anon && !url.includes('YOUR-PROJECT'))

export const supabase = createClient(url || 'http://localhost', anon || 'public-anon-key', {
  auth: { persistSession: true, autoRefreshToken: true },
})

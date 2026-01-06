import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Reaction {
  id: string
  reactant: string
  reagent: string
  product: string
  reaction_type: string
  mechanism: string
  conditions: string
  created_at: string
}

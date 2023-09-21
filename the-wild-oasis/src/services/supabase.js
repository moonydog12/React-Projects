import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://jzbxdprbtvnwpztewjpn.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASEKEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase

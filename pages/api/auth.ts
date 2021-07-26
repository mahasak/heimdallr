import { supabase } from '../../utils/supabaseClient'

export default function handler(req, res) {
  console.log(req);
  supabase.auth.api.setAuthCookie(req, res)
}
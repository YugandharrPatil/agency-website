import { createClient } from "@supabase/supabase-js";

import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from "astro:env/server";

const supabaseUrl = PUBLIC_SUPABASE_URL;
const supabaseKey = PUBLIC_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

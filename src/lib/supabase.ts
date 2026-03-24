import { createClient } from "@supabase/supabase-js";

import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from "astro:env/client";
import type { Database } from "../../database.types";

export const supabase = createClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);

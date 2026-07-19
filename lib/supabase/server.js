import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (e) {}
        },
        remove(name, options) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (e) {}
        }
      }
    }
  );
}

// Service-role client: to'liq huquqli, faqat server tomonida (API route) ishlatiladi.
// Bu klient AI agent ma'lumot o'qishi uchun kerak (RLS'ni chetlab o'tadi).
export function createServiceClient() {
  const { createClient: createRawClient } = require("@supabase/supabase-js");
  return createRawClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

import "server-only";
import { createClient } from "@supabase/supabase-js";

// This client uses the SERVICE ROLE key, which can read and write everything
// in your database, ignoring all access rules. That is safe ONLY because
// this file has the "server-only" import above, which makes Next.js throw a
// build error if any Client Component ever imports it by mistake.
//
// Only use this inside:
//  - Server Components (page.tsx / layout.tsx files without "use client")
//  - Server Actions (files or functions marked "use server")
//  - Route Handlers (app/**/route.ts)
export function createAdminClient() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables. " +
        "Set them in .env.local (locally) or in your hosting provider's project settings (in production)."
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

export const PHOTOS_BUCKET = "saree-photos";

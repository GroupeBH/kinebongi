import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const SESSION_COOKIE = "nzmu_admin_session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (token) {
    const supabase = getSupabaseAdmin();
    await supabase.from("admin_sessions").delete().eq("token", token);
  }

  const response = NextResponse.redirect(new URL("/admin/login", request.url));
  response.cookies.set(SESSION_COOKIE, "", { maxAge: 0, path: "/" });
  return response;
}

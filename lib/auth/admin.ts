import { cookies } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const SESSION_COOKIE = "nzmu_admin_session";

export const getAdminFromSession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return null;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("admin_sessions")
    .select(
      `
      id,
      token,
      expires_at,
      admin_user:admin_users (
        id,
        email,
        name,
        role
      )
    `
    )
    .eq("token", token)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();

  if (error || !data?.admin_user) {
    return null;
  }

  return {
    sessionId: data.id,
    user: data.admin_user,
  };
};

export const clearAdminSessionCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", { maxAge: 0, path: "/" });
};

export const setAdminSessionCookie = async (token: string, maxAge: number) => {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge,
    path: "/",
  });
};

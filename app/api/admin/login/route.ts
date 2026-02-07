import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { verifyPassword } from "@/lib/auth/password";

const SESSION_COOKIE = "nzmu_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { email, password } = await request.json().catch(() => ({}));

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email et mot de passe requis." },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();
  const { data: adminUser, error } = await supabase
    .from("admin_users")
    .select("id, email, password_hash, password_salt, role")
    .eq("email", String(email).trim().toLowerCase())
    .maybeSingle();

  if (error || !adminUser) {
    return NextResponse.json(
      { error: "Identifiants invalides." },
      { status: 401 }
    );
  }

  const valid = verifyPassword(
    String(password),
    adminUser.password_salt,
    adminUser.password_hash
  );

  if (!valid) {
    return NextResponse.json(
      { error: "Identifiants invalides." },
      { status: 401 }
    );
  }

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_TTL_SECONDS * 1000);

  const { error: sessionError } = await supabase.from("admin_sessions").insert({
    admin_user_id: adminUser.id,
    token,
    expires_at: expiresAt.toISOString(),
  });

  if (sessionError) {
    return NextResponse.json(
      { error: "Impossible de creer la session." },
      { status: 500 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: SESSION_TTL_SECONDS,
    path: "/",
  });

  return response;
}

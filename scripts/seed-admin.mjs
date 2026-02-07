import "dotenv/config";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD;

if (!supabaseUrl || !serviceKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

if (!adminEmail || !adminPassword) {
  console.error("Missing ADMIN_EMAIL or ADMIN_PASSWORD.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false },
});

const hashPassword = (password) => {
  const salt = crypto.randomBytes(16);
  const derived = crypto.scryptSync(password, salt, 64);
  return {
    salt: salt.toString("hex"),
    hash: derived.toString("hex"),
  };
};

const ensureAdmin = async () => {
  const { data: existingUser, error: lookupError } = await supabase
    .from("admin_users")
    .select("id, email")
    .eq("email", adminEmail)
    .maybeSingle();

  if (lookupError) {
    throw lookupError;
  }
  const { salt, hash } = hashPassword(adminPassword);

  if (existingUser) {
    const { error: updateError } = await supabase
      .from("admin_users")
      .update({
        password_salt: salt,
        password_hash: hash,
        role: "admin",
      })
      .eq("email", adminEmail);

    if (updateError) {
      throw updateError;
    }

    console.log(
      `Admin credentials updated for ${adminEmail}.`
    );
    return;
  }

  const { error } = await supabase.from("admin_users").insert({
    email: adminEmail,
    password_salt: salt,
    password_hash: hash,
    role: "admin",
  });

  if (error) {
    throw error;
  }

  console.log(`Admin user created: ${adminEmail}.`);
};

ensureAdmin().catch((error) => {
  console.error(error?.message ?? error);
  process.exit(1);
});

import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

export const hashPassword = (password: string) => {
  const salt = randomBytes(16);
  const derived = scryptSync(password, salt, 64);
  return {
    salt: salt.toString("hex"),
    hash: derived.toString("hex"),
  };
};

export const verifyPassword = (
  password: string,
  saltHex: string,
  hashHex: string
) => {
  const salt = Buffer.from(saltHex, "hex");
  const derived = scryptSync(password, salt, 64);
  const hash = Buffer.from(hashHex, "hex");
  if (hash.length !== derived.length) return false;
  return timingSafeEqual(hash, derived);
};

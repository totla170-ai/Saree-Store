export const ADMIN_COOKIE_NAME = "admin_session";

async function hmac(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "Missing ADMIN_SESSION_SECRET environment variable. Set it to any long random string."
    );
  }
  return secret;
}

export async function createSessionToken(): Promise<string> {
  return hmac(getSecret(), "admin-authenticated");
}

export async function isValidSessionToken(
  token: string | undefined | null
): Promise<boolean> {
  if (!token) return false;
  const expected = await createSessionToken();
  if (token.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < token.length; i++) {
    mismatch |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

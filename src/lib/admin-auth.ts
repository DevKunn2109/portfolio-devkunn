import { cookies } from "next/headers";
import { storeConfigured } from "./store-data";

export const sessionCookie = "minh-chau-admin";
export const adminConfigured = storeConfigured && Boolean(process.env.SUPABASE_PUBLISHABLE_KEY && process.env.BAKERY_ADMIN_IDS);

export function isAdmin(id: unknown) {
  return typeof id === "string" && (process.env.BAKERY_ADMIN_IDS ?? "").split(",").map((value) => value.trim()).includes(id);
}

export async function authRequest(path: string, init?: RequestInit) {
  return fetch(`${process.env.SUPABASE_URL}/auth/v1/${path}`, {
    ...init,
    cache: "no-store",
    signal: AbortSignal.timeout(7000),
    headers: { apikey: process.env.SUPABASE_PUBLISHABLE_KEY!, "Content-Type": "application/json", ...init?.headers },
  });
}

export async function adminSession() {
  if (!adminConfigured) return false;
  const token = (await cookies()).get(sessionCookie)?.value;
  if (!token) return false;
  try {
    const response = await authRequest("user", { headers: { Authorization: `Bearer ${token}` } });
    return response.ok && isAdmin((await response.json()).id);
  } catch {
    return false;
  }
}

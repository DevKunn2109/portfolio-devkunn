import { initialEntries, type Entry } from "./storefront";

export const storeConfigured = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY);
export const inquiriesEnabled = storeConfigured && process.env.BAKERY_ENABLE_INQUIRIES === "true";

export async function storeRequest(path: string, init?: RequestInit) {
  if (!storeConfigured) throw new Error("Store is not configured");
  const key = process.env.SUPABASE_SECRET_KEY!;
  return fetch(`${process.env.SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    cache: "no-store",
    signal: AbortSignal.timeout(7000),
    headers: {
      apikey: key,
      ...(key.startsWith("eyJ") ? { Authorization: `Bearer ${key}` } : {}),
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}

export async function publicEntries(): Promise<Entry[]> {
  if (!storeConfigured) return initialEntries;
  try {
    const response = await storeRequest("bakery_content?published=eq.true&order=position.asc,slug.asc&limit=400");
    if (response.ok) return await response.json();
  } catch {
    // Keep core contact and product information available during a data outage.
  }
  return initialEntries;
}

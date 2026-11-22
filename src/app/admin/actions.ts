"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { adminConfigured, adminSession, authRequest, isAdmin, sessionCookie } from "@/lib/admin-auth";
import { storeRequest } from "@/lib/store-data";

export async function signIn(data: FormData) {
  if (!adminConfigured) redirect("/admin");
  const email = String(data.get("email") ?? "").trim().slice(0, 254);
  const password = String(data.get("password") ?? "").slice(0, 256);
  let session: { user?: { id?: string }; access_token?: string; expires_in?: number } | undefined;
  try {
    const response = await authRequest("token?grant_type=password", { method: "POST", body: JSON.stringify({ email, password }) });
    if (response.ok) session = await response.json();
  } catch {
    // Show the same message for rejected logins and unavailable Auth.
  }
  if (!isAdmin(session?.user?.id) || !session?.access_token) redirect("/admin?notice=login");
  (await cookies()).set(sessionCookie, session.access_token, {
    httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production",
    maxAge: Math.min(session.expires_in ?? 3600, 3600), path: "/",
  });
  redirect("/admin");
}

export async function signOut() {
  (await cookies()).delete(sessionCookie);
  redirect("/admin");
}

export async function saveEntry(data: FormData) {
  if (!await adminSession()) redirect("/admin");
  const str = (key: string) => String(data.get(key) ?? "").trim();
  const kind = str("kind");
  const slug = str("slug");
  const title = str("title");
  const image = str("image");
  const video = str("video");
  const group = kind === "product" ? str("group") : "";
  const price = kind === "product" && str("price") ? Number(str("price")) : null;
  const position = Number(str("position"));
  const validMedia = (value: string) => !value || /^(?:https:\/\/[^\s]+|\/(?!\/)[a-zA-Z0-9._/-]+)$/.test(value);
  if (!["product", "article", "slide"].includes(kind) || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug) || slug.length > 100 ||
      !title || title.length > 160 || !validMedia(image) || !validMedia(video) || !["", "sale", "bestseller", "new"].includes(group) ||
      (price !== null && (!Number.isInteger(price) || price < 0 || price > 100000000)) || !Number.isInteger(position) || Math.abs(position) > 1000 ||
      str("summary").length > 450 || str("body").length > 15000) redirect("/admin?notice=invalid");
  let ok = false;
  try {
    const editing = data.get("editing") === "true";
    const response = await storeRequest(editing ? `bakery_content?kind=eq.${kind}&slug=eq.${slug}` : "bakery_content", {
      method: editing ? "PATCH" : "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({ kind, slug, title, summary: str("summary"), image, video, group, price, body: str("body"), published: data.has("published"), position }),
    });
    ok = response.ok && (await response.json()).length === 1;
  } catch {}
  if (!ok) redirect("/admin?notice=error");
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  if (kind === "article") revalidatePath(`/so-tay/${slug}`);
  redirect(`/admin?tab=${kind}&notice=saved`);
}

export async function handleInquiry(data: FormData) {
  if (!await adminSession()) redirect("/admin");
  const id = String(data.get("id"));
  if (!/^[0-9a-f-]{36}$/i.test(id)) redirect("/admin?tab=inquiries&notice=invalid");
  let ok = false;
  try {
    const response = await storeRequest(`bakery_inquiries?id=eq.${id}`, {
      method: "PATCH", body: JSON.stringify({ status: "handled" }),
    });
    ok = response.ok;
  } catch {}
  redirect(`/admin?tab=inquiries&notice=${ok ? "saved" : "error"}`);
}

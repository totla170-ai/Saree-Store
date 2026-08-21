"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createAdminClient, PHOTOS_BUCKET } from "@/lib/supabase/server";
import { createSessionToken, ADMIN_COOKIE_NAME } from "@/lib/admin-auth";
import type { SareeInput } from "@/lib/types";

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (!correctPassword) {
    throw new Error("Missing ADMIN_PASSWORD environment variable.");
  }

  if (password !== correctPassword) {
    redirect("/admin/login?error=1");
  }

  const token = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  redirect("/admin/login");
}

async function uploadImages(files: File[]): Promise<string[]> {
  if (files.length === 0) return [];
  const supabase = createAdminClient();
  const urls: string[] = [];

  for (const file of files) {
    if (!file || file.size === 0) continue;
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage
      .from(PHOTOS_BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false });

    if (error) {
      throw new Error(`Photo upload failed: ${error.message}`);
    }

    const { data } = supabase.storage.from(PHOTOS_BUCKET).getPublicUrl(path);
    urls.push(data.publicUrl);
  }

  return urls;
}

function parseSareeForm(formData: FormData): Omit<SareeInput, "image_urls"> {
  const price = Number(formData.get("price"));
  const originalPriceRaw = formData.get("original_price");
  const originalPrice = originalPriceRaw ? Number(originalPriceRaw) : null;

  return {
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    category: String(formData.get("category") ?? "").trim() || null,
    fabric: String(formData.get("fabric") ?? "").trim() || null,
    price,
    original_price: originalPrice && originalPrice > 0 ? originalPrice : null,
    is_featured: formData.get("is_featured") === "on",
    is_sold: formData.get("is_sold") === "on",
  };
}

export async function createSaree(formData: FormData) {
  const base = parseSareeForm(formData);

  if (!base.name || !base.price || base.price <= 0) {
    throw new Error("A saree needs at least a name and a price greater than 0.");
  }

  const files = formData
    .getAll("images")
    .filter((f): f is File => f instanceof File);
  const image_urls = await uploadImages(files);

  const supabase = createAdminClient();
  const { error } = await supabase.from("sarees").insert({ ...base, image_urls });
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateSaree(id: string, formData: FormData) {
  const base = parseSareeForm(formData);

  if (!base.name || !base.price || base.price <= 0) {
    throw new Error("A saree needs at least a name and a price greater than 0.");
  }

  const keepUrls = formData.getAll("keep_image").map(String);
  const newFiles = formData
    .getAll("images")
    .filter((f): f is File => f instanceof File);
  const newUrls = await uploadImages(newFiles);
  const image_urls = [...keepUrls, ...newUrls];

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("sarees")
    .update({ ...base, image_urls })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/product/${id}`);
  redirect("/admin");
}

export async function deleteSaree(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("sarees").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin");
}

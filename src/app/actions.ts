"use server";

import { refresh } from "next/cache";
import { API_URL } from "@/lib/api";

export type FormState = { error?: string; success?: boolean };

export async function createProduct(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const price = Number(formData.get("price"));

  if (!name) return { error: "Name is required." };
  if (name.length > 100) return { error: "Name must be 100 characters or less." };
  if (!Number.isFinite(price) || price < 0) {
    return { error: "Price must be a positive number." };
  }

  try {
    const res = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      const message = Array.isArray(body?.message)
        ? body.message.join(", ")
        : (body?.message ?? `API returned ${res.status}`);
      return { error: message };
    }
  } catch {
    return { error: "Could not reach the API." };
  }

  refresh();
  return { success: true };
}

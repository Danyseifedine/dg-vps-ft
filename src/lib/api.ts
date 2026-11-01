// The backend is only reachable from the Next.js server, never from the browser.
export const API_URL = process.env.API_URL ?? "http://localhost:4000";

export type Product = {
  id: number;
  name: string;
  price: string; // Decimal from the database, sent as a string to keep exact cents
  createdAt: string;
};

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/products`);
  if (!res.ok) throw new Error(`API returned ${res.status}`);
  return res.json();
}

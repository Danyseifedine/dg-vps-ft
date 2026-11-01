import { Suspense } from "react";
import { getProducts } from "@/lib/api";
import { ProductForm } from "./product-form";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

async function ProductList() {
  const products = await getProducts().catch(() => null);

  if (!products) {
    return <p className="text-red-600">Could not load products.</p>;
  }
  if (products.length === 0) {
    return <p className="text-neutral-500">No products yet.</p>;
  }
  return (
    <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
      {products.map((product) => (
        <li key={product.id} className="flex justify-between py-3">
          <span>{product.name}</span>
          <span className="font-mono">{money.format(Number(product.price))}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-8 px-4 py-16">
      <h1 className="text-3xl font-semibold">Products</h1>
      <ProductForm />
      <Suspense fallback={<p className="text-neutral-500">Loading...</p>}>
        <ProductList />
      </Suspense>
    </main>
  );
}

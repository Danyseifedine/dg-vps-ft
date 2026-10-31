import { Suspense } from "react";

async function HelloFromApi() {
  const apiUrl = process.env.API_URL ?? "http://localhost:4000";
  try {
    const res = await fetch(`${apiUrl}/api/helloWorld`);
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    const message = await res.text();
    return <h1 className="text-4xl font-semibold">{message}</h1>;
  } catch {
    return <p className="text-red-600">Could not reach the API at {apiUrl}</p>;
  }
}

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <Suspense fallback={<p>Loading...</p>}>
        <HelloFromApi />
      </Suspense>
    </main>
  );
}

"use client";

import { useActionState } from "react";
import { createProduct, type FormState } from "./actions";

const initialState: FormState = {};

export function ProductForm() {
  const [state, formAction, pending] = useActionState(createProduct, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          name="name"
          placeholder="Product name"
          required
          maxLength={100}
          className="flex-1 rounded-md border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          required
          min="0"
          step="0.01"
          className="rounded-md border border-neutral-300 bg-transparent px-3 py-2 sm:w-32 dark:border-neutral-700"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-foreground px-4 py-2 font-medium text-background disabled:opacity-50"
        >
          {pending ? "Adding..." : "Add"}
        </button>
      </div>
      <p aria-live="polite" className="text-sm text-red-600">
        {state.error}
      </p>
    </form>
  );
}

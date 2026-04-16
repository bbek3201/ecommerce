"use client";
import { useState } from "react";
import { useEffect } from "react";
import { Header } from "./components/Header";
import { Catergory } from "./components/Catergory";
import { Cards } from "./components/Cards";
import { useDebounce } from "use-debounce";
import React from "react";
import { ProductType } from "./types";
import { Footer } from "./components/Footer";

const PRODUCTS_PER_PAGE = 10;

export default function Home() {
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedValue] = useDebounce(inputValue, 500);

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [category, setCategory] = useState("");

  useEffect(() => {
    setSearch(debouncedValue);

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = category
          ? `https://dummyjson.com/products/category/${category}?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`
          : search
            ? `https://dummyjson.com/products/search?q=${search}&limit=${PRODUCTS_PER_PAGE}&skip=${skip}`
            : `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data.products);
        setTotal(data.total);
      } catch (err) {
        setError("Алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedValue, search, skip, category]);
  const handlePrev = () => {
    setSkip((s) => Math.max(0, s - PRODUCTS_PER_PAGE));
  };
  const handleNext = () => {
    setSkip((s) => s + PRODUCTS_PER_PAGE);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 dark:border-zinc-100"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#121212]">
      <Header />
      <Catergory
        category={category}
        setCategory={setCategory}
        setSkip={setSkip}
      />
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            placeholder="Бүтээгдэхүүн хайх..."
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition-colors focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-800 sm:max-w-md"
          />
        </div>
        <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
          {products.length} products found
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((Product) => (
            <Cards key={Product.id} Product={Product} />
          ))}
        </div>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            disabled={skip === 0}
            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            &larr; Өмнөх
          </button>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {Math.floor(skip / PRODUCTS_PER_PAGE) + 1} /
            {Math.ceil(total / PRODUCTS_PER_PAGE)}
          </span>
          <button
            onClick={handleNext}
            disabled={skip + PRODUCTS_PER_PAGE >= total}
            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Дараах &rarr;
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

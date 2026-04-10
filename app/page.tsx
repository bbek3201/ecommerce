"use client";
import { useEffect, useState } from "react";
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
};

type ProductResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};
// TODO 1: React hook-уудыг импортлох

// TODO 2: Product төрөл зарлах
// API: https://dummyjson.com/products

// TODO 3: API хариуны төрөл зарлах

const PRODUCTS_PER_PAGE = 10;

export default function Home() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);

  const [pagination, setPagination] = useState({ total: 0, skip: 0 });
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = search
          ? `https://dummyjson.com/products/search?q=${search}&limit=${PRODUCTS_PER_PAGE}&skip=${pagination.skip}`
          : `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${pagination.skip}`;
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
  }, [search, pagination.skip]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setSkip(0);
  };
  const handlePrev = () => {
    setSkip((s) => Math.max(0, s - PRODUCTS_PER_PAGE));
  };
  const handleNext = () => {
    setSkip((s) => s + PRODUCTS_PER_PAGE);
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
  // TODO 4: State хувьсагчдыг зарлах (products, loading, error)

  // TODO 5: Хайлтын state зарлах
  // search - хайлтын текст, эхлэх утга: ""

  // TODO 6: Pagination state зарлах
  // total - нийт бүтээгдэхүүний тоо, эхлэх утга: 0
  // skip  - алгассан тоо, эхлэх утга: 0

  // TODO 7: useEffect-ээр өгөгдөл татах
  // URL: search утгатай бол
  //   `https://dummyjson.com/products/search?q=${search}&limit=${PRODUCTS_PER_PAGE}&skip=${skip}`
  // Үгүй бол
  //   `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`
  // dependency array: [search, skip]
  // data.total-г total state-д хадгалах

  // TODO 8: Хайлт хийх handler
  // function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
  //   setSearch(e.target.value);
  //   setSkip(0);
  // }

  // TODO 9: Pagination handler-ууд
  // function handlePrev() { setSkip((s) => Math.max(0, s - PRODUCTS_PER_PAGE)); }
  // function handleNext() { setSkip((s) => s + PRODUCTS_PER_PAGE); }

  // TODO 10: Ачааллын төлөв (loading state)

  // TODO 11: Алдааны төлөв (error state)

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Product Store
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Browse our collection of products
          </p>
        </div>
      </header>

      {/* Category Navigation */}
      {/* TODO 15: Идэвхтэй категорийг тодруулах, дарахад тухайн категорийн бүтээгдэхүүн шүүх */}
      {/* API: https://dummyjson.com/products/category/{category} */}
      <nav className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6">
          <ul className="flex gap-1 overflow-x-auto py-3 no-scrollbar">
            <li>
              <button className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
                All
              </button>
            </li>
            <li>
              <button className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                Beauty
              </button>
            </li>
            <li>
              <button className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                Fragrances
              </button>
            </li>
            <li>
              <button className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                Furniture
              </button>
            </li>
            <li>
              <button className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                Groceries
              </button>
            </li>
            <li>
              <button className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                Home Decoration
              </button>
            </li>
            <li>
              <button className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                Kitchen Accessories
              </button>
            </li>
            <li>
              <button className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                Laptops
              </button>
            </li>
            <li>
              <button className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                Smartphones
              </button>
            </li>
            <li>
              <button className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                Sports Accessories
              </button>
            </li>
            <li>
              <button className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                Vehicle
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Search */}
        <div className="mb-8">
          {/* TODO: value={search} onChange={handleSearch} холбох */}
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Бүтээгдэхүүн хайх..."
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition-colors focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-800 sm:max-w-md"
          />
        </div>

        <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
          {/* TODO 12: Бүтээгдэхүүний тоо харуулах */}0 products found
        </p>

        {/* TODO 13: Доорх hardcode-г products.map() ашиглан солих */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="group rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="relative overflow-hidden rounded-t-2xl bg-zinc-100 dark:bg-zinc-800">
              <img
                src="https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
                alt="Essence Mascara Lash Princess"
                className="h-56 w-full object-cover transition-transform group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-zinc-700 backdrop-blur dark:bg-zinc-900/90 dark:text-zinc-300">
                beauty
              </span>
            </div>
            <div className="p-5">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h2 className="text-lg font-semibold leading-tight text-zinc-900 dark:text-zinc-100">
                  Essence Mascara Lash Princess
                </h2>
                <span className="shrink-0 rounded-lg bg-emerald-50 px-2.5 py-1 text-sm font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                  $9.99
                </span>
              </div>
              <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                The Essence Mascara Lash Princess is a popular mascara known for
                its volumizing and lengthening effects.
              </p>
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`h-4 w-4 ${star <= 5 ? "text-amber-400" : "text-zinc-200 dark:text-zinc-700"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  (4.94)
                </span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="relative overflow-hidden rounded-t-2xl bg-zinc-100 dark:bg-zinc-800">
              <img
                src="https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png"
                alt="Eyeshadow Palette with Mirror"
                className="h-56 w-full object-cover transition-transform group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-zinc-700 backdrop-blur dark:bg-zinc-900/90 dark:text-zinc-300">
                beauty
              </span>
            </div>
            <div className="p-5">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h2 className="text-lg font-semibold leading-tight text-zinc-900 dark:text-zinc-100">
                  Eyeshadow Palette with Mirror
                </h2>
                <span className="shrink-0 rounded-lg bg-emerald-50 px-2.5 py-1 text-sm font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                  $19.99
                </span>
              </div>
              <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                The Eyeshadow Palette with Mirror offers a versatile range of
                eyeshadow shades for creating stunning eye looks.
              </p>
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`h-4 w-4 ${star <= 4 ? "text-amber-400" : "text-zinc-200 dark:text-zinc-700"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  (3.28)
                </span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="relative overflow-hidden rounded-t-2xl bg-zinc-100 dark:bg-zinc-800">
              <img
                src="https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png"
                alt="Powder Canister"
                className="h-56 w-full object-cover transition-transform group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-zinc-700 backdrop-blur dark:bg-zinc-900/90 dark:text-zinc-300">
                beauty
              </span>
            </div>
            <div className="p-5">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h2 className="text-lg font-semibold leading-tight text-zinc-900 dark:text-zinc-100">
                  Powder Canister
                </h2>
                <span className="shrink-0 rounded-lg bg-emerald-50 px-2.5 py-1 text-sm font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                  $14.99
                </span>
              </div>
              <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                The Powder Canister is a finely milled setting powder designed
                to set makeup and control oil throughout the day.
              </p>
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`h-4 w-4 ${star <= 4 ? "text-amber-400" : "text-zinc-200 dark:text-zinc-700"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  (3.82)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-center gap-4">
          {/* TODO: onClick={handlePrev} disabled={skip === 0} холбох */}
          <button
            onClick={handlePrev}
            disabled={skip === 0}
            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            &larr; Өмнөх
          </button>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {Math.floor(skip / PRODUCTS_PER_PAGE) + 1} /{" "}
            {Math.ceil(total / PRODUCTS_PER_PAGE)}
            {/* TODO 14: Хуудасны дугаар харуулах */}
            {/* Хуудас {Math.floor(skip / PRODUCTS_PER_PAGE) + 1} / {Math.ceil(total / PRODUCTS_PER_PAGE)} */}
          </span>
          {/* TODO: onClick={handleNext} disabled={skip + PRODUCTS_PER_PAGE >= total} холбох */}
          <button
            onClick={handleNext}
            disabled={skip + PRODUCTS_PER_PAGE >= total}
            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Дараах &rarr;
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-4 text-center text-xs text-zinc-400">
          Exercise App &middot; Data from dummyjson.com
        </div>
      </footer>
    </div>
  );
}

// БОНУС TODO 14: Компонент болгон задлах
//   - app/types/product.ts
//   - app/components/ProductCard.tsx
//   - app/components/SearchBar.tsx
//   - app/components/Pagination.tsx
//   - app/components/ProductList.tsx
//   - app/page.tsx

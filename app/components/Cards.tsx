import Link from "next/link";
import { ReactNode } from "react";

interface ProductType {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
  catergpory: string;
  images: string[];
  brand: string;
  details: string;
}

export const Cards = ({ Product }: { Product: ProductType }) => {
  return (
    <Link
      href={`/product/${Product.id}`}
      className="block group rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="relative overflow-hidden rounded-t-2xl bg-zinc-100 dark:bg-zinc-800">
        <img
          src={Product.thumbnail}
          alt={String(Product.title)}
          className="h-56 w-full object-cover transition-transform group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-zinc-700 backdrop-blur dark:bg-zinc-900/90 dark:text-zinc-300">
          {Product.category}
        </span>
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h2 className="text-lg font-semibold leading-tight text-zinc-900 dark:text-zinc-100">
            {Product.title}
          </h2>
          <span className="shrink-0 rounded-lg bg-emerald-50 px-2.5 py-1 text-sm font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            {Product.price}
          </span>
        </div>
        <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {Product.description}
        </p>
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`h-4 w-4 ${Product.rating >= star ? "text-amber-400" : "text-zinc-200 dark:text-zinc-700"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {Product.rating}
          </span>
        </div>
      </div>
    </Link>
  );
};

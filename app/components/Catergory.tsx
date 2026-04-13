import React from "react";

export const Catergory = ({
  category,
  setCategory,
  setSkip,
}: {
  category: string;
  setCategory: (value: string) => void;
  setSkip: (value: number) => void;
}) => {
  return (
    <nav className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-6">
        <ul className="flex gap-1 overflow-x-auto py-3 no-scrollbar">
          <li>
            <button
              onClick={() => {
                setCategory("");
                setSkip(0);
              }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${category === "" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"}`}
            >
              All
            </button>
          </li>
          {[
            "beauty",
            "fragrances",
            "furniture",
            "groceries",
            "home-decoration",
            "kitchen",
            "laptops",
            "smartphones",
            "sports",
            "vehicle",
          ].map((cat) => (
            <li key={cat}>
              <button
                onClick={() => {
                  setCategory(cat);
                  setSkip(0);
                }}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${category === cat ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"}`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

import Link from "next/dist/client/link";

export const HeaderId = () => {
  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            &larr; Буцах
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Product Store
            </h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Product detail
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

import { useContext } from "react";
import { UserContext } from "../providers/Provider";
import Link from "next/link";

export const Header = () => {
  const { user, setUser } = useContext(UserContext) ?? {};
  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Product Store
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Browse our collection of products
          </p>
        </div>
        {!user ? (
          <Link
            href={"/login"}
            className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Нэвтрэх
          </Link>
        ) : (
          <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Hi, {user.username}
          </div>
        )}
      </div>
    </header>
  );
};

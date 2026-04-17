"use client";
import { createContext, useContext, useEffect, useState } from "react";

// TODO 1: React hook-уудыг импортлох (useState)

// TODO 2: useRouter импортлох (next/navigation)

import { useRouter } from "next/navigation";
import { User } from "../types";
import Link from "next/link";
import { UserContext } from "../providers/Provider";
// TODO 3: LoginResponse төрөл зарлах

// API: https://dummyjson.com/auth/login
// Method: POST
// Body: { username: string, password: string, expiresInMins?: number }
// Хариу: { id, username, email, firstName, lastName, gender, image, accessToken, refreshToken }

export function Login() {
  // TODO 4: useRouter hook ашиглах
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);
  // TODO 5: State хувьсагчдыг зарлах
  // username - нэвтрэх нэр, эхлэх утга: ""
  // password - нууц үг, эхлэх утга: ""
  // error    - алдааны мессеж, эхлэх утга: ""
  // loading  - ачааллын төлөв, эхлэх утга: false
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUser(data);
        router.push("/");
      });
  };

  // TODO 6: handleSubmit функц бичих
  // 1. e.preventDefault() дуудах
  // 2. error хоослох, loading true болгох
  // 3. fetch("https://dummyjson.com/auth/login") POST хүсэлт илгээх
  // 4. res.ok биш бол алдаа шидэх
  // 5. localStorage-д accessToken, refreshToken, user мэдээлэл хадгалах
  // 6. router.push("/") нүүр хуудас руу шилжүүлэх
  // 7. catch блокт error state-д алдааны мессеж хадгалах
  // 8. finally блокт loading false болгох

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
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
                Нэвтрэх хуудас
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mx-auto max-w-sm">
          {!user ? (
            <form
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              onSubmit={handleSubmit}
            >
              <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Нэвтрэх
              </h2>

              {/* TODO 8: error утгатай үед алдааны мессеж харуулах */}

              {/* Username талбар */}
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Нэвтрэх нэр
                </label>
                {/* TODO 9: value={username} onChange холбох */}
                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  id="username"
                  type="text"
                  required
                  placeholder="emilys"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition-colors focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
                />
              </div>

              {/* Password талбар */}
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Нууц үг
                </label>
                {/* TODO 10: value={password} onChange холбох */}
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  id="password"
                  type="password"
                  required
                  placeholder="emilyspass"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition-colors focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
                />
              </div>

              {/* TODO 11: disabled={loading} нэмэх, loading үед "Нэвтэрч байна..." текст харуулах */}
              <button
                disabled={loading}
                type="submit"
                className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Нэвтрэх
              </button>

              <p className="mt-4 text-center text-xs text-zinc-400 dark:text-zinc-500">
                Туршилт: <span className="font-mono">emilys</span> /{" "}
                <span className="font-mono">emilyspass</span>
              </p>
            </form>
          ) : (
            <div>Hello {user.username}</div>
          )}

          {/* TODO 12: Амжилттай нэвтэрсний дараа хэрэглэгчийн мэдээлэл харуулах */}
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

// БОНУС TODO 13: Нэвтэрсэн хэрэглэгчийн мэдээлэл авах
// GET https://dummyjson.com/auth/me
// Headers: { Authorization: "Bearer <accessToken>" }

// БОНУС TODO 14: Token шинэчлэх (refresh)
// POST https://dummyjson.com/auth/refresh
// Body: { refreshToken, expiresInMins: 60 }

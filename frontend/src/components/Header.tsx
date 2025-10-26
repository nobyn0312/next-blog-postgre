// src/components/Header.tsx
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between items-center px-6 py-3 bg-blue-500 text-white shadow">
      <h1 className="text-xl font-semibold">
        <Link href="/">My Blog</Link>
      </h1>

      <nav className="flex gap-4">
        {session ? (
          <>
            <span className="text-white">
              {session.user?.email}
          </span>
            <Link
            href="/blog/new/"
            className="text-sm text-white font-bold hover:underline"
          >
            ブログ投稿
          </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm text-white font-bold hover:underline"
            >
              ログアウト
            </button>
          </>
        ) : (
          <Link
            href="/auth/signin"
            className="text-sm text-white font-bold hover:underline"
          >
            ログイン
          </Link>
        )}
      </nav>
    </header>
  );
}

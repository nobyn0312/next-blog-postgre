"use client";

import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("ユーザー登録が完了しました！");
      setName("");
      setEmail("");
      setPassword("");
    } else {
      setMessage(data.error || "登録に失敗しました");
    }
  };

  return (
    <main className="min-h-screen bg-blue-50 py-12 px-4">
    <div className="max-w-md mx-auto bg-white border-2 border-blue-300 rounded-2xl shadow-sm p-8 space-y-6">
      <h1 className="text-2xl font-bold text-blue-700 text-center">
        新規ユーザー登録
      </h1>

      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="お名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-blue-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
        />

        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-blue-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
        />

        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-blue-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-200"
        >
          登録する
        </button>
      </form>

      {message && (
        <p
          className={`text-center font-medium ${
            message.includes("完了") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      <p className="text-center text-gray-600 text-sm">
        すでにアカウントをお持ちの方は{" "}
        <a
          href="/login"
          className="text-blue-600 hover:underline font-semibold"
        >
          ログインページへ
        </a>
      </p>
    </div>
  </main>
  );
}

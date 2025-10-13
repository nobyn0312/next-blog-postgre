"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setMessage("メールアドレスまたはパスワードが間違っています。");
    } else {
      setMessage("ログイン完了！トップページに移動します。");
      setTimeout(() => router.push("/"), 1000);
    }
  };

  return (
    <main className="min-h-screen bg-blue-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white border-2 border-blue-300 rounded-2xl shadow-sm p-8 space-y-6">
        <h1 className="text-2xl font-bold text-blue-700 text-center">
          ログイン
        </h1>

        <form onSubmit={handleSignin} className="flex flex-col gap-4">
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
            ログイン
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

        <div className="text-center space-y-2">
          <p className="text-gray-600 text-sm">
            アカウントをお持ちでない方は{" "}
            <a
              href="/auth/signup"
              className="text-blue-600 hover:underline font-semibold"
            >
              新規登録ページへ
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

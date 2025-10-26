"use client";
import React from "react";
import type { Blog } from "@/types/blog";

type Props = {
  inputTitle: string;
  inputContent: string;
  setInputTitle: (value: string) => void;
  setInputContent: (value: string) => void;
  onClickPost: (file?: File) => void;
};

export default function BlogForm({
  inputTitle,
  inputContent,
  setInputTitle,
  setInputContent,
  onClickPost, // ← ここを受け取る
}: Props) {
  return (
    <div className="max-w-2xl mx-auto bg-white border-2 border-blue-300 rounded-2xl shadow-sm p-6 space-y-5">
      <h1 className="text-2xl font-bold text-blue-700 text-center">
        ブログ投稿フォーム
      </h1>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="タイトルを入力"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          className="w-full border border-blue-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
        />

        <textarea
          placeholder="記事の内容を入力"
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          className="w-full border border-blue-300 rounded-md px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
        />

        <button
          onClick={() => onClickPost()} // ✅ これが必要！
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-200"
        >
          投稿する
        </button>
      </div>
    </div>
  );
}

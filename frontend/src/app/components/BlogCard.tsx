"use client";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "../page";

type Props = {
  blog: Blog;
  onClickEdit: (blog: Blog) => void;
  onClickDelete: (id: number) => void;
};

export default function BlogCard({ blog }: Props) {
  return (
    <div className="bg-white shadow-md border border-blue-100 rounded-xl p-5 hover:shadow-lg transition-all duration-200">
      <Link
        href={`/blog/${blog.id}`}
        className="text-xl font-bold text-blue-600 hover:underline"
      >
        <div className="text-sm text-gray-500 mb-2">
          {new Date(blog.createdAt).toLocaleString()}
        </div>

        <Image
          src={blog.keyVisual}
          width={320}
          height={180}
          alt="写真"
          className="rounded-lg mb-4"
        />

        <h2 className="text-xl font-bold text-blue-700 mb-2">{blog.title}</h2>
        <p className="text-gray-700 whitespace-pre-wrap mb-4">{blog.content}</p>
      </Link>

      {/* <div className="flex gap-3 mt-2">
        <button
          onClick={() => onClickEdit(blog)}
          className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg font-semibold"
        >
          編集
        </button>
        <button
          onClick={() => onClickDelete(blog.id)}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold"
        >
          削除
        </button>
      </div> */}
    </div>
  );
}

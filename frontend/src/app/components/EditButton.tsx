"use client";

import Link from "next/link";

type EditButtonProps = {
  blogId: number;
};

export default function EditButton({ blogId }: EditButtonProps) {
  return (
    <Link
      href={`/blog/new?edit=${blogId}`}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
    >
      編集
    </Link>
  );
}

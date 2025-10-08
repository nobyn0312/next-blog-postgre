// src/app/blog/[id]/page.tsx
import prisma from "@/lib/db";
import Image from "next/image";

type Props = {
  params: {
    id: string;
  };
};

// 動的にページを生成する
export default async function BlogDetail({ params }: Props) {
  const id = Number(params.id);
  const blog = await prisma.blog.findUnique({
    where: { id },
  });

  if (!blog) {
    return <div className="p-8 text-center text-gray-500">記事が見つかりません。</div>;
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      {blog.keyVisual && (
        <Image
          src={blog.keyVisual}
          alt={blog.title}
          width={800}
          height={400}
          className="rounded-2xl mb-6"
        />
      )}
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(blog.createdAt).toLocaleDateString("ja-JP")}
      </p>
      <article className="prose prose-lg">
        {blog.content}
      </article>
    </main>
  );
}

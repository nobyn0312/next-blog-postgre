import { prisma } from "@/lib/prisma";
import Image from "next/image";
import DeleteButton from "@/app/components/DeleteButton";
import EditButton from "@/app/components/EditButton";

type Props = {
  params: {
    id: string;
  };
};

export default async function BlogDetail({ params }: Props) {
  const id = Number(params.id);
  const blog = await prisma.blog.findUnique({
    where: { id },
  });

  if (!blog) {
    return (
      <main className="min-h-screen bg-blue-50 py-12 px-4">
        <div className="max-w-md mx-auto bg-white border-2 border-blue-300 rounded-2xl shadow-sm p-8 text-center text-gray-500">
          記事が見つかりません。
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white border-2 border-blue-300 rounded-2xl shadow-sm p-8 space-y-6">
        {blog.keyVisual && (
          <Image
            src={blog.keyVisual}
            alt={blog.title}
            width={800}
            height={400}
            className="rounded-xl border border-blue-100 shadow-sm"
          />
        )}

        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-blue-700 text-center">
              {blog.title}
            </h1>

            <p className="text-sm text-gray-500 text-center mt-2">
              {new Date(blog.createdAt).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          
          <DeleteButton blogId={blog.id} />
          <EditButton blogId={blog.id} />
        </div>

        <article className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {blog.content}
        </article>
      </div>
    </main>
  );
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 全件取得
export const getBlogs = async () => {
  return prisma.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

// 新規作成
export const addBlog = async (title: string, content: string) => {
  return prisma.blog.create({
    data: {
      title,
      content,
      keyVisual: "/next.svg", // デフォルトの画像
    },
  });
};

// 更新
export const updateBlog = async (id: number, title: string, content: string) => {
  return prisma.blog.update({
    where: { id },
    data: { title, content },
  });
};

// 削除
export const deleteBlog = async (id: number) => {
  return prisma.blog.delete({
    where: { id },
  });
};

export default prisma;

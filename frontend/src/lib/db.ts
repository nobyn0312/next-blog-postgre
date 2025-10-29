import { prisma } from "@/lib/prisma";

// 全件
export const getBlogs = async () => {
	return prisma.blog.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});
};

// ユーザーIDでフィルタリング
export const getBlogsByUserId = async (userId: number) => {
	return prisma.blog.findMany({
		where: {
			userId: userId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
};

// 新規作成
export const addBlog = async (
	title: string,
	content: string,
	userId: number
) => {
	return prisma.blog.create({
		data: {
			title,
			content,
			keyVisual: "/next.svg", // デフォルトの画像
			userId,
		},
	});
};

// 更新
export const updateBlog = async (
	id: number,
	title: string,
	content: string
) => {
	return prisma.blog.update({
		where: { id },
		data: { title, content },
	});
};

export const deleteBlog = async (id: number) => {
	return prisma.blog.delete({
		where: { id },
	});
};

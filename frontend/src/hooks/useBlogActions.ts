import { useState } from "react";
import { Blog } from "@/app/blog/new/page";

export function useBlogActions() {
	const [blogArray, setBlogArray] = useState<Blog[]>([]);
	const [editingId, setEditingId] = useState<number | null>(null);

	const postBlog = async (title: string, content: string) => {
		if (!title || !content) {
			alert("タイトルと内容を入力");
			return;
		}

		if (editingId !== null) {
			const res = await fetch("/api/blog", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: editingId, title, content }),
			});
			const updated = await res.json();
			setBlogArray((prev) =>
				prev.map((b) => (b.id === updated.id ? updated : b))
			);
			setEditingId(null);
		} else {
			const res = await fetch("/api/blog", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ title, content, keyVisual: "/next.svg" }),
			});
			const newBlog = await res.json();
			setBlogArray((prev) => [newBlog, ...prev]);
		}
	};

	const deleteBlog = async (id: number) => {
		await fetch("/api/blog", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id }),
		});
		setBlogArray((prev) => prev.filter((b) => b.id !== id));
	};

	const startEdit = (blog: Blog, setInputTitle: any, setInputContent: any) => {
		setInputTitle(blog.title);
		setInputContent(blog.content);
		setEditingId(blog.id);
	};

	return { blogArray, postBlog, deleteBlog, startEdit };
}

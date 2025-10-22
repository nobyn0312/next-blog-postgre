"use client";

import BlogForm from "@/app/components/BlogForm";
import React, { useState } from "react";

export type Blog = {
	id: number;
	title: string;
	content: string;
	createdAt: string; // API からは ISO 文字列で取得
	keyVisual: string;
};

const page = () => {
	const [inputTitle, setInputTitle] = useState("");
	const [inputContent, setInputContent] = useState("");
	const [blogArray, setBlogArray] = useState<Blog[]>([]);
	const [editingId, setEditingId] = useState<number | null>(null);

	// 投稿 or 編集
	const onClickPost = async () => {
		if (!inputTitle || !inputContent) return alert("タイトルと内容を入力");

		if (editingId !== null) {
			// 編集なのでPUT
			const res = await fetch("/api/blog", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: editingId,
					title: inputTitle,
					content: inputContent,
				}),
			});
			const updated = await res.json();
			setBlogArray((prev) =>
				prev.map((b) => (b.id === updated.id ? updated : b))
			);
			setEditingId(null);
		} else {
			// 新規投稿
			const res = await fetch("/api/blog", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title: inputTitle,
					content: inputContent,
					keyVisual: "/next.svg",
				}),
			});
			const newBlog = await res.json();
			setBlogArray((prev) => [newBlog, ...prev]);
		}

		setInputTitle("");
		setInputContent("");
	};

	// 削除
	const onClickDelete = async (id: number) => {
		await fetch("/api/blog", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id }),
		});
		setBlogArray((prev) => prev.filter((b) => b.id !== id));
	};

	// 編集開始
	const onClickEdit = (blog: Blog) => {
		setInputTitle(blog.title);
		setInputContent(blog.content);
		setEditingId(blog.id);
	};

	return (
		<div>
			<BlogForm
				inputTitle={inputTitle}
				inputContent={inputContent}
				setInputTitle={setInputTitle}
				setInputContent={setInputContent}
				onClickPost={onClickPost}
			/>
		</div>
	);
};

export default page;

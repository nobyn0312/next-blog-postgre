"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getServerSession} from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";


import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";

// exportして、Blogの型を他で使えるようにする
export type Blog = {
	id: number;
	title: string;
	content: string;
	createdAt: string; // API からは ISO 文字列で取得
	keyVisual: string;
};

export default function Home() {
	const [inputTitle, setInputTitle] = useState("");
	const [inputContent, setInputContent] = useState("");
	const [blogArray, setBlogArray] = useState<Blog[]>([]);
	const [editingId, setEditingId] = useState<number | null>(null);

	// DB からブログ一覧を取得
	const fetchBlogs = async () => {
		const res = await fetch("/api/blog");
		const data = await res.json();
		setBlogArray(data);
	};

	useEffect(() => {
		fetchBlogs();
	}, []);

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



	// return (
	// 	<main className='min-h-screen bg-blue-50 py-12 px-4'>
	// 		<div className='max-w-2xl mx-auto bg-white border-2 border-blue-300 rounded-2xl shadow-sm p-6 space-y-5'>
	// 			<h1 className='text-2xl font-bold text-blue-700 text-center'>
	// 				ブログ投稿フォーム
	// 			</h1>

	// 			<div className='flex flex-col gap-4'>
	// 				<input
	// 					type='text'
	// 					placeholder='タイトルを入力'
	// 					value={inputTitle}
	// 					onChange={(e) => setInputTitle(e.target.value)}
	// 					className='w-full border border-blue-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400'
	// 				/>

	// 				<textarea
	// 					placeholder='記事の内容を入力'
	// 					value={inputContent}
	// 					onChange={(e) => setInputContent(e.target.value)}
	// 					className='w-full border border-blue-300 rounded-md px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400'
	// 				/>

	// 				<button
	// 					onClick={onClickPost}
	// 					className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-200'
	// 				>
	// 					投稿する
	// 				</button>
	// 			</div>
	// 		</div>

	// 		<div className='max-w-3xl mx-auto mt-12 space-y-6'>
	// 			{blogArray.map((blog) => (
	// 				<div
	// 					key={blog.id}
	// 					className='bg-white shadow-md border border-blue-100 rounded-xl p-5 hover:shadow-lg transition-all duration-200'
	// 				>
	// 					<Link
	// 						href={`/blog/${blog.id}`}
	// 						className='text-xl font-bold text-blue-600 hover:underline'
	// 					>
	// 						<div className='text-sm text-gray-500 mb-2'>
	// 							{new Date(blog.createdAt).toLocaleString()}
	// 						</div>

	// 						<Image
	// 							src={blog.keyVisual}
	// 							width={320}
	// 							height={180}
	// 							alt='写真'
	// 							className='rounded-lg mb-4'
	// 						/>

	// 						<h2 className='text-xl font-bold text-blue-700 mb-2'>
	// 							{blog.title}
	// 						</h2>
	// 						<p className='text-gray-700 whitespace-pre-wrap mb-4'>
	// 							{blog.content}
	// 						</p>

	// 						<div className='flex gap-3'>
	// 							<button
	// 								onClick={() => onClickEdit(blog)}
	// 								className='px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg font-semibold'
	// 							>
	// 								編集
	// 							</button>
	// 							<button
	// 								onClick={() => onClickDelete(blog.id)}
	// 								className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold'
	// 							>
	// 								削除
	// 							</button>
	// 						</div>
	// 					</Link>
	// 				</div>
	// 			))}
	// 		</div>
	// 	</main>
	// );

	return (
    <main className="min-h-screen bg-blue-50 py-12 px-4">

      <BlogList
        blogArray={blogArray}
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
      />
    </main>
  );

}


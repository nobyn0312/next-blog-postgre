"use client";
import React, { useEffect, useState } from "react";
import DeleteButton from "@/app/components/DeleteButton";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Blog = {
	id: number;
	title: string;
	content: string;
	createdAt: string;
	keyVisual: string;
	userId: number | null;
};

const Page = () => {
	const { data: session, status } = useSession();
	const [blogs, setBlogs] = useState<Blog[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBlogs = async () => {
			if (status === "loading") return;

			const sessionUser = session?.user as { id?: string } | undefined;
			if (sessionUser?.id) {
				try {
					const res = await fetch("/api/blog/my");
					if (res.ok) {
						const userBlogs = await res.json();
						setBlogs(userBlogs);
					}
				} catch (error) {
					console.error("Failed to fetch blogs:", error);
				}
			}
			setLoading(false);
		};
		fetchBlogs();
	}, [session, status]);

	if (status === "loading" || loading) {
		return (
			<main className='min-h-screen bg-blue-50 py-12 px-4'>
				<div className='max-w-4xl mx-auto'>
					<p>読み込み中...</p>
				</div>
			</main>
		);
	}

	if (!session) {
		return (
			<main className='min-h-screen bg-blue-50 py-12 px-4'>
				<div className='max-w-4xl mx-auto'>
					<p>ログインしてください</p>
				</div>
			</main>
		);
	}

	return (
		<main className='min-h-screen bg-blue-50 py-12 px-4'>
			<div className='max-w-4xl mx-auto'>
				<h1 className='text-3xl font-bold text-blue-700 mb-8'>
					あなたのブログ
				</h1>
				{blogs.length === 0 ? (
					<p className='text-gray-600'>ブログ記事がありません</p>
				) : (
					<ul className='space-y-4'>
						{blogs.map((blog) => (
							<li
								key={blog.id}
								className='flex items-center justify-between bg-white p-4 rounded-lg shadow-md border border-blue-100'
							>
								<Link
									href={`/blog/${blog.id}`}
									className='flex-1 hover:text-blue-600 transition-colors'
								>
									<div className='flex items-center gap-4'>
										<div className='flex-1'>
											<h2 className='text-xl font-semibold text-gray-800'>
												{blog.title}
											</h2>
											<p className='text-sm text-gray-500 mt-1'>
												{new Date(blog.createdAt).toLocaleString()}
											</p>
										</div>
									</div>
								</Link>
								<DeleteButton blogId={blog.id} />
							</li>
						))}
					</ul>
				)}
			</div>
		</main>
	);
};
export default Page;

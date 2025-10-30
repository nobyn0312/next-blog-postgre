"use client";

import React, { useState } from "react";
import BlogForm from "@/app/components/BlogForm";
import { useBlogActions } from "@/hooks/useBlogActions";
import { useRouter } from "next/navigation";

export type Blog = {
	id: number;
	title: string;
	content: string;
	createdAt: string;
	keyVisual: string;
};

const Page = () => {
	const [inputTitle, setInputTitle] = useState("");
	const [inputContent, setInputContent] = useState("");
	const [isPosted, setIsPosted] = useState(false);
	const { postBlog } = useBlogActions();
	const router = useRouter();

	const handlePost = async (title: string, content: string) => {
		await postBlog(title, content);
		setIsPosted(true);
		setInputTitle("");
		setInputContent("");
		router.push("/");
	};

	return (
		<div className='max-w-3xl mx-auto mt-12 space-y-6 text-center'>
			{isPosted ? (
				<div className='text-green-600 font-bold text-xl'>完了しました</div>
			) : (
				<BlogForm
					inputTitle={inputTitle}
					inputContent={inputContent}
					setInputTitle={setInputTitle}
					setInputContent={setInputContent}
					onClickPost={() => handlePost(inputTitle, inputContent)}
				/>
			)}
		</div>
	);
};

export default Page;

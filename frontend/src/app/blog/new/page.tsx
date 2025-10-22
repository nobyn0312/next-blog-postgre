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


  // import { useBlogActions } from "@/hooks/useBlogActions";
import { useBlogActions } from "@/hooks/useBlogActions";
	// 投稿 or 編集


	return (
    <div className="max-w-3xl mx-auto mt-12 space-y-6">
<BlogForm
				inputTitle={inputTitle}
				inputContent={inputContent}
				setInputTitle={setInputTitle}
				setInputContent={setInputContent}
				onClickPost={() => postBlog(inputTitle, inputContent)}
			/>
		</div>
	);
};

export default page;

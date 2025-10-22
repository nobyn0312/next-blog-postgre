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
	// const [inputTitle, setInputTitle] = useState("");
	// const [inputContent, setInputContent] = useState("");
	const [blogArray, setBlogArray] = useState<Blog[]>([]);
	// const [editingId, setEditingId] = useState<number | null>(null);

	// DB からブログ一覧を取得
	const fetchBlogs = async () => {
		const res = await fetch("/api/blog");
		const data = await res.json();
		setBlogArray(data);
	};

	useEffect(() => {
		fetchBlogs();
	}, []);




	return (
    <main className="min-h-screen bg-blue-50 py-12 px-4">

      <BlogList
        blogArray={blogArray}
      />
    </main>
  );

}


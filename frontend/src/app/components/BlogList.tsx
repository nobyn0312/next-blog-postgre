"use client"

import Link from "next/link"
import { Blog } from "../page"
import BlogCard from "./BlogCard";

type Props = {
  blogArray: Blog[];
  onClickEdit: (blog: Blog) => void;
  onClickDelete: (id: number) => void;
};


export default function BlogList({ blogArray, onClickEdit, onClickDelete }: Props) {
  return (
    <div className="max-w-3xl mx-auto mt-12 space-y-6">
      {blogArray.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
        />
      ))}
    </div>
  );
}
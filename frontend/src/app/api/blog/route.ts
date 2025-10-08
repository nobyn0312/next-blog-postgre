import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getBlogs, addBlog, updateBlog, deleteBlog } from "@/lib/db";

const prisma = new PrismaClient();
export async function GET() {
  const blogs = await getBlogs();
  return NextResponse.json(blogs);
}

export async function POST(req: Request) {
  const { title, content } = await req.json();
  const newBlog = await addBlog(title, content);
  return NextResponse.json(newBlog);
}

export async function PUT(req: Request) {
  const { id, title, content } = await req.json();
  const updatedBlog = await updateBlog(id, title, content);
  return NextResponse.json(updatedBlog);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await deleteBlog(id);
  return NextResponse.json({ id });
}
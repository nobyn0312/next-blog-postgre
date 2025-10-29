import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getBlogs, addBlog, updateBlog, deleteBlog } from "@/lib/db";

type SessionWithId = {
	user?: {
		id: string;
		name: string;
		email: string;
		image: string;
	};
};

export async function GET() {
	const blogs = await getBlogs();
	return NextResponse.json(blogs);
}

export async function POST(req: Request) {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const sessionWithId = session as SessionWithId;
	const userId = sessionWithId.user?.id;
	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { title, content } = await req.json();
	const userIdNum = parseInt(userId, 10);
	const newBlog = await addBlog(title, content, userIdNum);
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
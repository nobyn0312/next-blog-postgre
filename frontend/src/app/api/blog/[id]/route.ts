import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
	params: { id: string };
};

export async function GET(_req: Request, { params }: Params) {
	const id = Number(params.id);
	if (Number.isNaN(id)) {
		return NextResponse.json({ error: "Invalid id" }, { status: 400 });
	}

	const blog = await prisma.blog.findUnique({
		where: { id },
		select: {
			id: true,
			title: true,
			content: true,
			keyVisual: true,
			createdAt: true,
			userId: true,
		},
	});

	if (!blog) {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}

	return NextResponse.json(blog);
}

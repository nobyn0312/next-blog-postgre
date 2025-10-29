import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getBlogsByUserId } from "@/lib/db";

type SessionWithId = {
	user?: {
		id: string;
		name: string;
		email: string;
		image: string;
	};
};

export async function GET() {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const sessionWithId = session as SessionWithId;
	const userId = sessionWithId.user?.id;
	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const userIdNum = parseInt(userId, 10);
	const blogs = await getBlogsByUserId(userIdNum);
	return NextResponse.json(blogs);
}

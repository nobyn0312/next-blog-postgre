import { NextResponse } from "next/server";
import { pool, getTodos, addTodo, updateTodo, deleteTodo } from "@/lib/db";

export async function GET() {
  const todos = await getTodos();
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const { title } = await req.json();
  const newTodo = await addTodo(title);
  return NextResponse.json(newTodo);
}

export async function PUT(req: Request) {
  const { id, completed } = await req.json();
  const updated = await updateTodo(id, completed);
  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await deleteTodo(id);
  return NextResponse.json({ id });
}

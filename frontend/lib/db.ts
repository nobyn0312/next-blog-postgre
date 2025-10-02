

import { Pool } from "pg";

declare global {
  // Node.js のグローバルオブジェクトに型を持たせて再生成を防ぐ
  var pgPool: Pool | undefined;
}

const connectionString = process.env.DATABASE_URL || "postgresql://inoue:password@localhost:5432/todo-db";

// **グローバルに Pool を持たせて、再生成を防止**
export const pool: Pool = global.pgPool
  ?? new Pool({
    connectionString,
    max: 10,            // 同時接続の上限（お好きに調整）
    idleTimeoutMillis: 30000,
    allowExitOnIdle: true,
  });

// 開発モードではグローバル変数に格納（モジュールの再読み込み対策）
if (process.env.NODE_ENV !== "production") {
  global.pgPool = pool;
}

// 型宣言
export type Todo = {
  id: number;
  todo: string;
  completed: boolean;
};

export async function getTodos(): Promise<Todo[]> {
  const res = await pool.query<Todo>("SELECT * FROM todo;");
  return res.rows;
}

export async function addTodo(todo: string): Promise<Todo> {
  const res = await pool.query<Todo>(
    "INSERT INTO todo (todo, completed) VALUES ($1, false) RETURNING *;",
    [todo]
  );
  return res.rows[0];
}

export async function updateTodo(id: number, completed: boolean): Promise<Todo> {
  const res = await pool.query<Todo>(
    "UPDATE todo SET completed = $1 WHERE id = $2 RETURNING *;",
    [completed, id]
  );
  return res.rows[0];
}

export async function deleteTodo(id: number): Promise<void> {
  await pool.query("DELETE FROM todo WHERE id = $1;", [id]);
}

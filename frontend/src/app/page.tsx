"use client";

import { stringify } from "querystring";
import { useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // DBからTodoを取得
  const fetchTodos = async () => {
    const res = await fetch("/api/todo");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // 追加
  const onClickAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText) return;
    const res = await fetch("/api/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: inputText }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);

    console.log(newTodo)
    setInputText("");
  };

  // 完了
  const onClickComplete = async (todo: Todo) => {
    const res = await fetch("/api/todo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: todo.id, completed: true }),
    });
    const updated = await res.json();
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
  };

  // 戻す
  const onClickBack = async (todo: Todo) => {
    const res = await fetch("/api/todo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: todo.id, completed: false }),
    });
    const updated = await res.json();
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
  };

  // 削除
  const onClickDelete = async (todo: Todo) => {
    await fetch("/api/todo", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: todo.id }),
    });
    setTodos(todos.filter((t) => t.id !== todo.id));
  };

  // 編集
  const onClickEdit = (todo: Todo) => {
    setInputText(todo.title);
  };

  // 画面表示用に未完了・完了を分ける
  const incompleteTodos = todos.filter((t) => !t.completed);
  const completeTodos = todos.filter((t) => t.completed);

  return (
    <>
      <div>
        <h1>Todo</h1>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={onClickAdd}>登録</button>
      </div>

      <div>
        <p>未完了</p>
        <ul>
          {incompleteTodos.map((todo) => (
            <li key={todo.id}>
              <span>{todo.title}</span>
              <button onClick={() => onClickComplete(todo)}>完了</button>
              <button onClick={() => onClickDelete(todo)}>削除</button>
              <button onClick={() => onClickEdit(todo)}>編集</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p>完了済み</p>
        <ul>
          {completeTodos.map((todo) => (
            <li key={todo.id}>
              <span>{todo.title}</span>
              <button onClick={() => onClickBack(todo)}>戻す</button>
              <button onClick={() => onClickDelete(todo)}>削除</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

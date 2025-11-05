"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setmainTask] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [username, setUsername] = useState("");

  const backendURL = "http://127.0.0.1:5000";

  // Load tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch(`${backendURL}/tasks`, {
      credentials: "include",
    });

    if (res.status === 401) {
      window.location.href = "/login"; // redirect if not logged in
      return;
    }

    const data = await res.json();
    setmainTask(data);
  };

  // Add new task
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;

    await fetch(`${backendURL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title, desc }),
    });

    setTitle("");
    setDesc("");
    fetchTasks();
  };

  // Delete task
  const deleteHandler = async (id) => {
    await fetch(`${backendURL}/tasks/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    fetchTasks();
  };

  // Toggle complete
  const completeHandler = async (id, completed) => {
    await fetch(`${backendURL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ completed: !completed }),
    });
    fetchTasks();
  };

  // Start editing
  const startEdit = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
    setEditDesc(task.desc);
  };

  // Save updated task
  const saveEdit = async (id) => {
    await fetch(`${backendURL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title: editTitle, desc: editDesc }),
    });
    setEditId(null);
    fetchTasks();
  };

  // Logout
  const logoutHandler = async () => {
    await fetch(`${backendURL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    alert("Logged out successfully!");
    window.location.href = "/login";
  };

  return (
    <>
      <div className="bg-black text-white flex justify-between items-center p-5">
        <h1 className="font-bold text-2xl">My Todo List</h1>
        <button
          onClick={logoutHandler}
          className="bg-red-600 px-4 py-2 rounded-xl text-white hover:bg-red-800"
        >
          Logout
        </button>
      </div>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="text-2xl border-zinc-800 border-2 m-5 px-4 py-2"
          placeholder="Enter your task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="text-2xl border-zinc-800 border-2 m-5 px-4 py-2"
          placeholder="Enter Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button
          type="submit"
          className="bg-amber-900 text-blue-200 px-3 py-3 font-bold rounded-3xl m-5"
        >
          Add Task
        </button>
      </form>

      <div className="p-8 bg-slate-200">
        {mainTask.length === 0 ? (
          <h2 className="text-center text-xl">No Task Available</h2>
        ) : (
          <ul>
            {mainTask.map((t) => (
              <li key={t.id} className="flex items-center justify-between mb-4">
                <div
                  className={`flex justify-between mb-5 w-3/5 ${
                    t.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {editId === t.id ? (
                    <>
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="border p-2 mr-2"
                      />
                      <input
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        className="border p-2"
                      />
                    </>
                  ) : (
                    <>
                      <h5 className="text-xl font-semibold">{t.title}</h5>
                      <h6 className="text-xl font-semibold">{t.desc}</h6>
                    </>
                  )}
                </div>

                <div className="space-x-2">
                  {editId === t.id ? (
                    <button
                      onClick={() => saveEdit(t.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-xl"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEdit(t)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-xl"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => completeHandler(t.id, t.completed)}
                    className="bg-green-500 text-white px-4 py-2 rounded-xl"
                  >
                    {t.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    onClick={() => deleteHandler(t.id)}
                    className="bg-red-400 text-white px-4 py-2 rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

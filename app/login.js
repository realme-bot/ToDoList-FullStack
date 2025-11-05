"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const backendURL = "http://127.0.0.1:5000";
  const router = useRouter();

  const loginHandler = async (e) => {
    e.preventDefault();
    const res = await fetch(`${backendURL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      router.push("/"); // Go to main page.js
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-3xl mb-5 font-bold">Login</h1>
      <form onSubmit={loginHandler}>
        <input
          className="border p-3 m-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-3 m-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-5 py-2 rounded-2xl m-2">
          Login
        </button>
      </form>
    </div>
  );
}

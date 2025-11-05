"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const backendURL = "http://127.0.0.1:5000";

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${backendURL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Login successful!");
      router.push("/");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-32">
      <h1 className="text-4xl font-bold text-blue-600 mb-5">MyTodo</h1>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
          >
            Log in
          </button>
        </form>
        <p className="mt-4 text-center">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Create new account
          </span>
        </p>
      </div>
    </div>
  );
}

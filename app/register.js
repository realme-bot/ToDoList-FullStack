"use client";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const backendURL = "http://127.0.0.1:5000";

  const registerHandler = async (e) => {
    e.preventDefault();
    const res = await fetch(`${backendURL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    alert(data.message || data.error);
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-3xl mb-5 font-bold">Register</h1>
      <form onSubmit={registerHandler}>
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
        <button className="bg-green-600 text-white px-5 py-2 rounded-2xl m-2">
          Register
        </button>
      </form>
    </div>
  );
}

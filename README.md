# 📝 Full Stack ToDoList App (Next.js + Flask)

A simple and modern To-Do web application that allows multiple users to **register, log in, and manage their personal tasks**.  
The app supports **CRUD operations** (Create, Read, Update, Delete) and is built using **Next.js (frontend)** and **Flask (backend)**.

---

## 🚀 Features

✅ User Registration & Login (Flask backend authentication)  
✅ Add, Edit, Delete personal tasks  
✅ Each user sees only their own tasks  
✅ Frontend built with **Next.js (App Router)**  
✅ Backend built with **Flask + JSON storage / SQLite**  
✅ CORS enabled for smooth frontend–backend communication  

---

## 🗂️ Project Structure

TODOLIST
│
├── .next
│
├── app
│   ├── login
│   │   └── page.js
│   │
│   ├── register
│   │   └── page.js
│   │
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   ├── login.js
│   ├── page.js
│   └── register.js
│
├── backend
│   ├── app.py
│   ├── data.json
│   └── requirements.txt




🔁 App Flow

Register Page (/register) – New users create an account.

Login Page (/login) – Registered users log in.

Home Page (/) – Users can add, edit, and delete their tasks.

Tasks are stored per user and fetched dynamically from Flask backend.

Logout brings users back to /login.

🧠 Future Enhancements

✅ Store tasks in a database (SQLite/MySQL)

✅ Add JWT authentication

✅ Deploy frontend on Vercel & backend on Render/Heroku

✅ Add dark mode

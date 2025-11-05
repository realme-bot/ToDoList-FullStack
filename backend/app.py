from flask import Flask, jsonify, request, session
from flask_cors import CORS
import json, os

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = "supersecretkey"  # Needed for session

DATA_FILE = 'data.json'

# Helper functions
def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []
    return []

def save_data(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=4)

# ---------------- USER ROUTES ----------------

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    users = load_data()
    username = data.get('username')
    password = data.get('password')

    if any(u["username"] == username for u in users):
        return jsonify({"error": "Username already exists"}), 400

    users.append({"username": username, "password": password, "tasks": []})
    save_data(users)
    return jsonify({"message": "Registration successful"}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    users = load_data()
    username = data.get('username')
    password = data.get('password')

    for u in users:
        if u["username"] == username and u["password"] == password:
            session["username"] = username
            return jsonify({"message": "Login successful"})

    return jsonify({"error": "Invalid username or password"}), 401


@app.route('/logout', methods=['POST'])
def logout():
    session.pop("username", None)
    return jsonify({"message": "Logged out"})


# ---------------- TASK ROUTES ----------------

@app.route('/tasks', methods=['GET'])
def get_tasks():
    username = session.get("username")
    if not username:
        return jsonify({"error": "Not logged in"}), 401

    users = load_data()
    user = next((u for u in users if u["username"] == username), None)
    return jsonify(user["tasks"] if user else [])


@app.route('/tasks', methods=['POST'])
def add_task():
    username = session.get("username")
    if not username:
        return jsonify({"error": "Not logged in"}), 401

    data = request.get_json()
    users = load_data()

    for u in users:
        if u["username"] == username:
            new_task = {
                "id": len(u["tasks"]) + 1,
                "title": data.get("title"),
                "desc": data.get("desc"),
                "completed": False
            }
            u["tasks"].append(new_task)
            save_data(users)
            return jsonify({"message": "Task added"}), 201


@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    username = session.get("username")
    if not username:
        return jsonify({"error": "Not logged in"}), 401

    data = request.get_json()
    users = load_data()

    for u in users:
        if u["username"] == username:
            for t in u["tasks"]:
                if t["id"] == task_id:
                    t.update(data)
                    save_data(users)
                    return jsonify({"message": "Task updated"})
    return jsonify({"error": "Task not found"}), 404


@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    username = session.get("username")
    if not username:
        return jsonify({"error": "Not logged in"}), 401

    users = load_data()
    for u in users:
        if u["username"] == username:
            u["tasks"] = [t for t in u["tasks"] if t["id"] != task_id]
            save_data(users)
            return jsonify({"message": "Task deleted"})
    return jsonify({"error": "Task not found"}), 404


if __name__ == '__main__':
    app.run(debug=True)

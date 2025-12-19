📘 An Interactive Study Tool

An interactive study tool inspired by NotebookLM, built to help students learn economics through chapter-based questions and answers.

✨ What This App Does

Allows students to ask questions in a student–teacher chat format

Generates answers only from the provided chapter and videos

Supports follow-up questions using conversation memory

Displays video summaries and exam-focused points

⚠️ Only questions related to the chapter “Oligopoly” are supported.

📚 Study Material Used

Economics Chapter: Oligopoly

YouTube Videos: Summarized and used as learning context

🛠️ Technologies Used
Frontend

React (Vite)

JavaScript

Backend

Node.js

Express.js

Groq LLM API (LLaMA 3.1)

Deployment

Frontend: Vercel

⚙️ Setup & Run Locally
1. Clone the repository
git clone <your-repo-url>
cd study-tool

2. Backend setup
cd backend
npm install


Create a .env file inside the backend folder:

PORT=5000
GROQ_API_KEY=your_api_key_here


Start the backend server:

node index.js


Backend runs on:

http://localhost:5000

3. Frontend setup
cd frontend
npm install
npm run dev


Create a .env file inside the frontend folder:

VITE_BACKEND_URL=http://localhost:5000


Frontend runs on:

http://localhost:5173

4. Open the app

Open your browser and visit:

http://localhost:5173

🧠 How It Works (Brief)

Student asks a question

Chapter content and video summaries are sent to the backend

AI responds using only that content

Out-of-syllabus questions are rejected

🎯 Purpose

Built as an internship assignment to demonstrate:

Context-based AI responses

Interactive learning experience

Clean frontend–backend integration

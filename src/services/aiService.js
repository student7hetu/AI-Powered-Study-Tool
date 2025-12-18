export async function askTeacher(question) {
  const response = await fetch("http://localhost:5000/ask-teacher", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error("Backend error");
  }

  const data = await response.json();
  return data.answer;
}

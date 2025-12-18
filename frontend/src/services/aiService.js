export async function askTeacher(
  question,
  chapterContent,
  videoContext,
  chatHistory
) {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      question,
      chapterContent,
      videoContext,
      chatHistory,
    }),
  });

  const data = await response.json();
  return data.answer;
}

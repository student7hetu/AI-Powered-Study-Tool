export async function askTeacher(
  question,
  chapterContent,
  videoContext,
  chatHistory
) {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const response = await fetch(`${BASE_URL}/ask-teacher`, {
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

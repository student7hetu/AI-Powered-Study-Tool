export async function askTeacher(
  question,
  chapterContent,
  videoContext,
  chatHistory
) {
  const response = await fetch('http://localhost:5000/ask-teacher', {
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

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.get('/test-key', (req, res) => {
  res.send(process.env.HF_API_KEY ? 'Key loaded' : 'Key missing');
});

app.post('/ask-teacher', async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  try {
    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'system',
              content:
                'You are an economics teacher. Explain clearly in simple terms.',
            },
            {
              role: 'user',
              content: question,
            },
          ],
          temperature: 0.5,
        }),
      }
    );

    const rawText = await response.text();
    console.log('GROQ RAW RESPONSE:', rawText);

    let answer = 'I could not generate an answer.';

    try {
      const data = JSON.parse(rawText);
      answer = data.choices[0].message.content;
    } catch {
      answer = 'Groq returned an invalid response.';
    }

    res.json({ answer });
  } catch (error) {
    console.error('Groq backend error:', error);
    res.status(500).json({ answer: 'AI service failed.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Load environment variables
require('dotenv').config();

const express = require('express');
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const app   = express();

app.use(express.json());

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Missing message' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model:    'gpt-4',
      messages: [{ role: 'user', content: message }]
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error('OpenAI error:', err);
    const status   = err.status || 500;
    const errorMsg = err.response?.data ?? err.message;
    res.status(status).json({ error: errorMsg });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


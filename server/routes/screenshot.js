const express = require('express');
const multer = require('multer');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// POST /api/screenshot
router.post('/', upload.single('image'), async (req, res) => {
  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: 'GROQ_API_KEY not configured' });
  }
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  const dataUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

  const prompt = `Extract analytics metrics from this Instagram/TikTok screenshot. Return ONLY valid JSON with exactly these keys (use null for any value not visible):
{"views":null,"likes":null,"comments":null,"saves":null,"shares":null,"hookRate":null,"completionRate":null,"newFollowers":null}
Plain numbers only, no units, no text.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        max_tokens: 300,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'image_url', image_url: { url: dataUrl } },
              { type: 'text', text: prompt },
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';
    const match = text.match(/\{[\s\S]*?\}/);
    if (!match) return res.status(422).json({ error: 'Could not parse metrics from screenshot' });

    const metrics = JSON.parse(match[0]);
    res.json(metrics);
  } catch (err) {
    res.status(422).json({ error: 'Screenshot parsing failed', detail: err.message });
  }
});

module.exports = router;

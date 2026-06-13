const router = require('express').Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// POST /api/screenshot — Groq vision parsing (key stays server-side)
router.post('/', upload.single('image'), async (req, res) => {
  const key = process.env.GROQ_API_KEY;
  if (!key) return res.status(500).json({ error: 'GROQ_API_KEY not configured on server' });
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

  const mt = req.file.mimetype || 'image/jpeg';
  const b64 = req.file.buffer.toString('base64');
  const dataUrl = `data:${mt};base64,${b64}`;

  let groqRes;
  try {
    groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        max_tokens: 300,
        messages: [{ role: 'user', content: [
          { type: 'image_url', image_url: { url: dataUrl } },
          { type: 'text', text: `Instagram or TikTok Reel/Video analytics screenshot. Extract all visible metrics. Return ONLY this JSON (null if not visible): {"views":null,"likes":null,"comments":null,"saves":null,"shares":null,"hookRate":null,"completionRate":null,"newFollowers":null} hookRate = 3-second retention %, completionRate = watch-through %, all values as plain numbers.` },
        ] }],
      }),
    });
  } catch (e) {
    return res.status(502).json({ error: 'Groq network error: ' + e.message });
  }

  if (!groqRes.ok) {
    const err = await groqRes.json().catch(() => ({}));
    return res.status(502).json({ error: err.error?.message || `Groq HTTP ${groqRes.status}` });
  }

  const json = await groqRes.json();
  const txt = json.choices?.[0]?.message?.content || '';
  const m = txt.match(/\{[\s\S]*?\}/);
  if (!m) return res.status(422).json({ error: 'No JSON in Groq response' });

  try {
    res.json(JSON.parse(m[0]));
  } catch {
    res.status(422).json({ error: 'JSON parse failed' });
  }
});

module.exports = router;

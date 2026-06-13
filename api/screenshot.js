module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: 'GROQ_API_KEY not configured' });
  }

  const { dataUrl } = req.body;
  if (!dataUrl || !dataUrl.startsWith('data:')) {
    return res.status(400).json({ error: 'No image provided' });
  }

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
        messages: [{
          role: 'user',
          content: [
            { type: 'image_url', image_url: { url: dataUrl } },
            { type: 'text', text: prompt },
          ],
        }],
      }),
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';
    const match = text.match(/\{[\s\S]*?\}/);
    if (!match) return res.status(422).json({ error: 'Could not parse metrics from screenshot' });

    res.json(JSON.parse(match[0]));
  } catch (err) {
    res.status(422).json({ error: 'Screenshot parsing failed', detail: err.message });
  }
};

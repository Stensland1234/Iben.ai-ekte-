export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  try {
    const { jobAd } = req.body;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'OpenAI API key not set' });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Du er en ekspert på rekruttering og skal analysere en stillingsannonse.',
          },
          {
            role: 'user',
            content: jobAd,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || 'Ukjent feil fra OpenAI' });
    }

    return res.status(200).json({ result: data.choices[0].message.content });
  } catch (error) {
    console.error('Feil i analyse:', error);
    return res.status(500).json({ error: 'Serverfeil under analyse' });
  }
}

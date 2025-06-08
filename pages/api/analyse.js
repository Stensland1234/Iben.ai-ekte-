export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { jobText } = req.body;

  if (!jobText) {
    return res.status(400).json({ message: 'No jobText provided' });
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Du er en ekspert i å lese og analysere nordiske stillingsannonser. Du skal forklare hva arbeidsgiver ser etter, og hvordan en kandidat bør skrive søknad og CV for å passe perfekt til stillingen. Svar alltid på norsk, uansett språk i annonsen.',
        },
        {
          role: 'user',
          content: jobText,
        },
      ],
      temperature: 0.6,
    }),
  });

  const data = await response.json();

  if (data.error) {
    return res.status(500).json({ message: data.error.message });
  }

  const result = data.choices?.[0]?.message?.content || 'Ingen analyse kunne genereres.';
  return res.status(200).json({ analysis: result });
}

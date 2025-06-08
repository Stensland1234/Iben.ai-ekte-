import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const { annonse } = req.body;

  if (!annonse) {
    return res.status(400).json({ error: 'Mangler annonse' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Du er en ekspert i rekruttering og skal analysere en stillingsannonse og finne ut hva arbeidsgiver egentlig ser etter. Gi en kort oppsummering av de viktigste kravene og ønskene, og hva kandidaten bør fokusere på.",
        },
        {
          role: "user",
          content: annonse,
        },
      ],
    });

    const svar = response.choices[0].message.content;
    res.status(200).json({ svar });

  } catch (error) {
    console.error('OpenAI-feil:', error);
    res.status(500).json({ error: 'Feil under analyse' });
  }
}

// pages/api/analyse.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Kun POST-støttes' });
  }

  try {
    const { stillingsannonse } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Du er en ekspert på rekruttering og analyse av stillingsannonser. Gi en kort analyse av kravene i denne annonsen.",
          },
          {
            role: "user",
            content: stillingsannonse,
          },
        ],
        temperature: 0.3,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Feil i OpenAI-svar");
    }

    const analyse = data.choices[0].message.content;
    res.status(200).json({ analyse });
  } catch (error) {
    console.error("Feil i analyse:", error.message);
    res.status(500).json({ error: "Kunne ikke analysere stillingsannonsen" });
  }
}

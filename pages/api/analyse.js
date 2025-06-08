export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Kun POST-støttet." });
    return;
  }

  const { annonse } = req.body;

  if (!annonse) {
    res.status(400).json({ error: "Ingen annonse mottatt." });
    return;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Du er en ekspert på jobbanalyser. Når du får en stillingsannonse, skal du gi en kortfattet analyse av hva slags profil de ser etter – uten å gjenta hele teksten. Vær tydelig, konkret og hjelp kandidaten å forstå det viktigste de må fremheve.",
          },
          {
            role: "user",
            content: annonse,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      throw new Error("Ingen svar fra OpenAI.");
    }

    const analyse = data.choices[0].message.content;
    res.status(200).json({ analyse });
  } catch (error) {
    console.error("Feil i analyse:", error);
    res.status(500).json({ error: "Klarte ikke analysere annonsen." });
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { inputText } = req.body;

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
          content: "Du er en ekspert på nordiske jobbsøknader. Gi en analyse av en stillingsannonse: Hvilke krav stilles? Hva bør kandidaten fremheve? Hva slags rolle er det?",
        },
        {
          role: "user",
          content: inputText,
        },
      ],
    }),
  });

  const data = await response.json();
  const answer = data.choices?.[0]?.message?.content;

  return res.status(200).json({ result: answer });
}

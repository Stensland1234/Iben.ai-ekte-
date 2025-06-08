import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { annonse } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ message: "OpenAI API key missing" });
  }

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Du er en ekspert på jobbsøknader. Les stillingsannonsen og gi en analyse av hva arbeidsgiver ser etter – og hva en søker bør fokusere på for å få jobben.",
        },
        {
          role: "user",
          content: annonse,
        },
      ],
      temperature: 0.7,
    });

    const svar = completion.data.choices[0].message.content;
    res.status(200).json({ analyse: svar });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Feil under OpenAI-analyse." });
  }
}

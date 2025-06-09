// pages/api/analyse.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text } = req.body;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        { role: 'system', content: 'Du er en ekspert på jobbsøknader.' },
        { role: 'user', content: text },
      ],
      temperature: 0.7,
    });

    const message = completion.choices[0]?.message?.content || 'Ingen svar';
    res.status(200).json({ result: message });
  } catch (error: any) {
    console.error('Feil i analyse API:', error);
    res.status(500).json({ error: 'Intern feil i analyse API.' });
  }
}

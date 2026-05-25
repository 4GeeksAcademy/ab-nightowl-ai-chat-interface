import 'dotenv/config';

const apiKey = process.env.NEXT_PUBLIC_GROK_API_KEY;
const apiUrl: string = 'https://api.groq.com/openai/v1/chat/completions';

if (!apiKey || !apiUrl) {
  console.error('Clé API ou URL manquante. Vérifiez votre .env.');
  process.exit(1);
}

async function testGroqFetch() {
  const body = {
    model: 'llama-3.1-8b-instant',
    messages: [
      { role: 'user', content: 'Say hi in one short sentence.' }
    ],
    temperature: 0.2,
    max_tokens: 32
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });
    console.log('Status:', response.status, response.statusText);
    const data = await response.json();
    console.dir(data, { depth: null });
  } catch (err) {
    console.error('Erreur lors de la requête:', err);
  }
}

testGroqFetch();

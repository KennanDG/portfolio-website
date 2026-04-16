const RAG_API_URL =
  process.env.RAG_API_URL ||
  'https://eqrd9vw8q0.execute-api.us-east-1.amazonaws.com/v1/rag/query';

  

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question } = req.body ?? {};

    if (!question || typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({ error: 'A question is required.' });
    }

    const apiKey = process.env.RAG_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'Server is missing RAG_API_KEY.' });
    }

    const response = await fetch(RAG_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        question: question.trim(),
        namespace: 'default',
        enable_parallel_collection_retrieval: false,
      }),
    });

    const text = await response.text();

    let data: unknown = null;
    try {
      data = JSON.parse(text);
    } 
    catch {
      data = { raw: text };
    }

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Upstream RAG API request failed.',
        details: data,
      });
    }

    return res.status(200).json(data);
  } 
  catch (error) {
    console.error('rag-query proxy error:', error);

    return res.status(500).json({
      error: 'Unexpected server error while calling the RAG API.',
    });

  }
}
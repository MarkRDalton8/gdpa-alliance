// Vercel Serverless Function: Create Contract User
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, first_name, last_name } = req.body;

  // Validate input
  if (!email || !first_name || !last_name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const API_TOKEN = process.env.PIANO_API_TOKEN;
  const APP_ID = process.env.PIANO_APP_ID;
  const CONTRACT_ID = process.env.PIANO_CONTRACT_ID;
  const API_BASE_URL = process.env.PIANO_API_BASE_URL || 'https://sandbox.tinypass.com/api/v3';

  try {
    const endpoint = `${API_BASE_URL}/publisher/licensing/contractUser/create`;

    const formData = new URLSearchParams({
      api_token: API_TOKEN,
      aid: APP_ID,
      contract_id: CONTRACT_ID,
      email,
      first_name,
      last_name
    });

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Create user error:', error);
    return res.status(500).json({ error: error.message });
  }
}

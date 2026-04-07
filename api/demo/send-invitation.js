// Vercel Serverless Function: Send Invitation Email
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const API_TOKEN = process.env.PIANO_API_TOKEN;
  const APP_ID = process.env.PIANO_APP_ID;
  const CONTRACT_ID = process.env.PIANO_CONTRACT_ID;
  const API_BASE_URL = process.env.PIANO_API_BASE_URL || 'https://sandbox.tinypass.com/api/v3';

  try {
    // First, find the contract_user_id for this email
    const listEndpoint = `${API_BASE_URL}/publisher/licensing/contractUser/list`;
    const listFormData = new URLSearchParams({
      api_token: API_TOKEN,
      aid: APP_ID,
      contract_id: CONTRACT_ID
    });

    const listResponse = await fetch(listEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: listFormData
    });

    const listData = await listResponse.json();
    const users = listData.ContractUserList || [];
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(404).json({ error: 'User not found in contract' });
    }

    // Send invitation
    const inviteEndpoint = `${API_BASE_URL}/publisher/licensing/contractUser/invite`;
    const inviteFormData = new URLSearchParams({
      api_token: API_TOKEN,
      aid: APP_ID,
      contract_id: CONTRACT_ID,
      contract_user_id: user.contract_user_id
    });

    const inviteResponse = await fetch(inviteEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: inviteFormData
    });

    const inviteData = await inviteResponse.json();

    if (!inviteResponse.ok) {
      return res.status(inviteResponse.status).json(inviteData);
    }

    return res.status(200).json(inviteData);
  } catch (error) {
    console.error('Send invitation error:', error);
    return res.status(500).json({ error: error.message });
  }
}

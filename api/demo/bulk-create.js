// Vercel Serverless Function: Bulk Create Users
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { users } = req.body; // Array of { email, first_name, last_name }

  if (!users || !Array.isArray(users) || users.length === 0) {
    return res.status(400).json({ error: 'Users array is required' });
  }

  const API_TOKEN = process.env.PIANO_API_TOKEN;
  const APP_ID = process.env.PIANO_APP_ID;
  const CONTRACT_ID = process.env.PIANO_CONTRACT_ID;
  const API_BASE_URL = process.env.PIANO_API_BASE_URL || 'https://sandbox.tinypass.com/api/v3';

  try {
    const endpoint = `${API_BASE_URL}/publisher/licensing/contractUser/create`;

    const results = {
      total: users.length,
      created: 0,
      failed: 0,
      duplicates: 0,
      details: []
    };

    // Process each user sequentially (could be parallel, but serial is safer for demo)
    for (const user of users) {
      const formData = new URLSearchParams({
        api_token: API_TOKEN,
        aid: APP_ID,
        contract_id: CONTRACT_ID,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
      });

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData
        });

        const data = await response.json();

        if (response.ok) {
          results.created++;
          results.details.push({
            email: user.email,
            status: 'created',
            contract_user_id: data.contract_user?.contract_user_id
          });
        } else {
          // Check if duplicate
          if (data.message && data.message.includes('already exists')) {
            results.duplicates++;
            results.details.push({
              email: user.email,
              status: 'duplicate'
            });
          } else {
            results.failed++;
            results.details.push({
              email: user.email,
              status: 'failed',
              error: data.message || 'Unknown error'
            });
          }
        }
      } catch (error) {
        results.failed++;
        results.details.push({
          email: user.email,
          status: 'failed',
          error: error.message
        });
      }
    }

    return res.status(200).json(results);
  } catch (error) {
    console.error('Bulk create error:', error);
    return res.status(500).json({ error: error.message });
  }
}

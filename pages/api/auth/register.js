

import { register } from '../../../backend/authService';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      await register(email, password);
      res.status(200).json({ message: 'User registered successfully, redirecting to login...' });
    } catch (error) {
      console.error('Error registering user:', error); // Log the error
      res.status(500).json({ error: error.message || 'Internal server error' }); // Return the error message
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

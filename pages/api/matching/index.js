import { findMatchingVolunteers } from '../../../backend/matchingService';
import authMiddleware from '../../../middleware/authMiddleware';

export default async function handler(req, res) {
  console.log(`${req.method} request to /api/matching`);

  if (req.method === 'POST') {
    try {
      // Use the middleware with a correct next function
      await new Promise((resolve, reject) => {
        authMiddleware(req, res, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });

      const { eventId } = req.body;

      // Validate eventId
      if (!eventId || isNaN(parseInt(eventId, 10))) {
        return res.status(400).json({ error: 'Invalid event ID' });
      }

      const matchingVolunteers = await findMatchingVolunteers(eventId);
      return res.status(200).json(matchingVolunteers);
    } catch (error) {
      console.error('Error matching volunteers:', error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

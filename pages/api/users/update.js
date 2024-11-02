import { PrismaClient } from '@prisma/client';
import authMiddleware from '../../../middleware/authMiddleware';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Use authMiddleware to authenticate the request
  await new Promise((resolve, reject) => {
    authMiddleware(req, res, (result) => (result instanceof Error ? reject(result) : resolve(result)));
  });

  const userId = req.user.id; // Fetch the authenticated user ID
  const { fullName, address1, address2, city, state, zipCode, skills, preferences, availability } = req.body;

  try {
    // Ensure availability is an array and convert dates to ISO-8601 strings
    const formattedAvailability = Array.isArray(availability) 
      ? availability.map(date => new Date(date).toISOString()) 
      : [];

    const updatedProfile = await prisma.userProfile.update({
      where: { userId: parseInt(userId) },
      data: {
        fullName,
        address1,
        address2,
        city,
        state,
        zipCode,
        skills,
        preferences,
        availability: { set: formattedAvailability }, // Use set operator for Json type field
      },
    });

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Error updating user profile' });
  }
}

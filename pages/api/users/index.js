// pages/api/users/index.js
import authMiddleware from '../../../middleware/authMiddleware';
import prisma from '../../../lib/prisma';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    await authMiddleware(req, res, async () => {
      const { user } = req;
      try {
        const userProfile = await prisma.userProfile.findUnique({
          where: { userId: user.id },
        });
        res.status(200).json(userProfile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  } else if (req.method === 'PUT') {
    await authMiddleware(req, res, async () => {
      const { user } = req;
      const {
        fullName,
        address1,
        address2,
        city,
        state,
        zipCode,
        skills,
        preferences,
        availability,
      } = req.body;

      try {
        const updatedProfile = await prisma.userProfile.upsert({
          where: { userId: user.id },
          update: {
            fullName,
            address1,
            address2,
            city,
            state,
            zipCode,
            skills,
            preferences,
            availability,
          },
          create: {
            userId: user.id,
            fullName,
            address1,
            address2,
            city,
            state,
            zipCode,
            skills,
            preferences,
            availability,
          },
        });

        res.status(200).json(updatedProfile);
      } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;

// pages/api/events/index.js
import { createEvent, getAllEvents } from '../../../backend/eventService';

export default async function handler(req, res) {
  console.log(`${req.method} request to /api/events`);

  if (req.method === 'POST') {
    try {
      const { eventName, eventDescription, requiredSkills, location, eventDate, urgency } = req.body;

      // Ensure requiredSkills is an array
      const skillsArray = Array.isArray(requiredSkills) ? requiredSkills : requiredSkills.split(',').map(skill => skill.trim());

      const eventData = {
        eventName,
        eventDescription,
        requiredSkills: skillsArray,
        location,
        eventDate: new Date(eventDate),
        urgency,
      };

      const newEvent = await createEvent(eventData);
      return res.status(201).json(newEvent);
    } catch (error) {
      console.error('Error creating event:', error);
      return res.status(500).json({ error: 'Error creating event' });
    }
  } else if (req.method === 'GET') {
    try {
      const events = await getAllEvents();
      console.log('Fetched events:', events);
      return res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      return res.status(500).json({ error: 'Error fetching events' });
    }
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}

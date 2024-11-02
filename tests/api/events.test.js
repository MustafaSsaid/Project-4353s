import request from 'supertest';
import { createServer } from 'http';

let server;

beforeAll((done) => {
    server = createServer((req, res) => {
        // Mock response for the /api/events endpoint
        if (req.method === 'GET' && req.url === '/api/events') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ events: [] })); // Mock response for getting events
        } else if (req.method === 'POST' && req.url === '/api/events') {
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ event: { name: 'New Event', date: '2024-08-01' } })); // Mock response for creating an event
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
    server.listen(3000, done);
});

afterAll((done) => {
    server.close(done);
});

describe('Event API', () => {
    it('should get all events', async () => {
        const res = await request(server).get('/api/events');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('events'); // Check for the 'events' property
    });

    it('should create a new event', async () => {
        const res = await request(server)
            .post('/api/events')
            .send({
                name: 'New Event',
                date: '2024-08-01'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('event'); // Check for the 'event' property
    });
});
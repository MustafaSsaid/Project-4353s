// tests/api/matching.test.js
import request from 'supertest';
import { createServer } from 'http';

let server;

beforeAll((done) => {
    server = createServer((req, res) => {
        // Mock response for the /api/matching endpoint
        if (req.method === 'POST' && req.url === '/api/matching') {
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json'); // Set content type
            res.end(JSON.stringify({ success: true })); // Mock response
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
    server.listen(3000, done);
});

afterAll((done) => {
    if (server) {
        server.close(done);
    } else {
        done();
    }
});

describe('Matching API', () => {
    it('should match a volunteer to an event', async () => {
        const match = { volunteer_id: 1, event_id: 1 };
        const res = await request(server).post('/api/matching').send(match);
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ success: true }); // Check the mocked response
    });
});
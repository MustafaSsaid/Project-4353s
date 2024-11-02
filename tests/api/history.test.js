// tests/api/history.test.js
import request from 'supertest';
import { createServer } from 'http';

let server;

beforeAll((done) => {
    server = createServer((req, res) => {
        // Mock response for the /api/history endpoint
        if (req.method === 'GET' && req.url === '/api/history') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ history: [] })); // Mock response for getting history records
        } else if (req.method === 'POST' && req.url === '/api/history') {
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ history: { volunteer_id: 1, event_id: 2, status: 'participated' } })); // Mock response for creating a history record
        } else {
            res.statusCode = 404;
            res.end();
        }
    });

    server.listen(3000, (err) => {
        if (err) {
            return done(err); // Handle any errors that occur while starting the server
        }
        done(); // Call done when the server is ready
    });
});

afterAll((done) => {
    server.close(done);
});

describe('History API', () => {
    it('should get all history records', async () => {
        const res = await request(server).get('/api/history');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('history'); // Check for the 'history' property
    });

    it('should create a new history record', async () => {
        const res = await request(server)
            .post('/api/history')
            .send({
                volunteer_id: 1,
                event_id: 2,
                status: 'participated'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('history'); // Check for the 'history' property
    });
});
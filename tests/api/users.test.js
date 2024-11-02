import request from 'supertest';
import { createServer } from 'http';

let server;

beforeAll((done) => {
    server = createServer((req, res) => {
        // Mock response for the /api/users endpoint
        if (req.method === 'GET' && req.url === '/api/users') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ users: [] })); // Mock response for getting users
        } else if (req.method === 'POST' && req.url === '/api/users') {
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ user: { email: 'test@example.com' } })); // Mock response for creating a user
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

describe('User API', () => {
    it('should get all users', async () => {
        const res = await request(server).get('/api/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('users'); // Check for the 'users' property
    });

    it('should create a new user', async () => {
        const res = await request(server)
            .post('/api/users')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('user'); // Check for the 'user' property
    });
});
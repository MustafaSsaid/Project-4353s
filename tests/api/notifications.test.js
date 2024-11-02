// tests/api/notifications.test.js
// tests/api/notifications.test.js
import request from 'supertest';
import { createServer } from 'http';

let server;

beforeAll((done) => {
    server = createServer((req, res) => {
        // Mock response for the /api/notifications endpoint
        if (req.method === 'GET' && req.url === '/api/notifications') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ notifications: [] })); // Mock response for getting notifications
        } else if (req.method === 'POST' && req.url === '/api/notifications') {
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ notification: { title: 'New Notification', content: 'Notification content' } })); // Mock response for creating a notification
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

describe('Notification API', () => {
    it('should get all notifications', async () => {
        const res = await request(server).get('/api/notifications');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('notifications'); // Check for the 'notifications' property
    });

    it('should create a new notification', async () => {
        const res = await request(server)
            .post('/api/notifications')
            .send({
                title: 'New Notification',
                content: 'Notification content'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('notification'); // Check for the 'notification' property
    });
});
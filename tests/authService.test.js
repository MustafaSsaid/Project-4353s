

import { register, login } from '../backend/authService';
import pool from '../backend/db';
import bcrypt from 'bcrypt';

jest.mock('../backend/db', () => ({
    query: jest.fn()
}));

describe('Auth Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should register a new user Paul Atreides', async () => {
        pool.query.mockResolvedValueOnce({ rows: [] }); // Simulate no existing user
        pool.query.mockResolvedValueOnce({ rows: [{ id: 1, email: 'paul.atreides@arrakis.com' }] });
        const user = await register('paul.atreides@arrakis.com', 'MuadDib');
        expect(user).toHaveProperty('id');
        expect(user.email).toBe('paul.atreides@arrakis.com');
    });

    it('should fail to register a user that already exists', async () => {
        // Simulate user already exists
        pool.query.mockResolvedValueOnce({ rows: [{ id: 1, email: 'existing.user@example.com' }] });
        await expect(register('existing.user@example.com', 'password123')).rejects.toThrow('User already exists');
    });

    it('should login a user Paul Atreides', async () => {
        const hashedPassword = await bcrypt.hash('MuadDib', 10);
        pool.query.mockResolvedValueOnce({ rows: [{ id: 1, email: 'paul.atreides@arrakis.com', password: hashedPassword }] });
        const user = await login('paul.atreides@arrakis.com', 'MuadDib');
        expect(user).toHaveProperty('id');
        expect(user.email).toBe('paul.atreides@arrakis.com');
    });

    it('should fail to login with incorrect password', async () => {
        const hashedPassword = await bcrypt.hash('correctPassword', 10);
        pool.query.mockResolvedValueOnce({ rows: [{ id: 1, email: 'user@example.com', password: hashedPassword }] });
        const user = await login('user@example.com', 'wrongPassword');
        expect(user).toBeNull(); // Expect null for incorrect password
    });

    it('should fail to login for non-existing user', async () => {
        pool.query.mockResolvedValueOnce({ rows: [] }); // Simulate no user found
        const user = await login('nonexistent@example.com', 'password123');
        expect(user).toBeNull(); // Expect null for non-existing user
    });
});

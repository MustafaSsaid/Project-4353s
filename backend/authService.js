
import pool from './db';
import bcrypt from 'bcrypt';

const register = async (email, password) => {
    try {
        // Check if the user already exists
        const existingUser = await pool.query('SELECT * FROM user_credentials WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            throw new Error('User already exists'); // Throw an error if the user exists
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO user_credentials (email, password) VALUES ($1, $2) RETURNING *',
            [email, hashedPassword]
        );
        return result.rows[0]; // Ensure this returns a valid user object
    } catch (error) {
        console.error('Error during registration:', error); // Log the error
        throw error; // Rethrow the error to be handled in the API
    }
};

const login = async (email, password) => {
    const result = await pool.query('SELECT * FROM user_credentials WHERE email = $1', [email]);
    const user = result.rows[0];
    if (user && await bcrypt.compare(password, user.password)) {
        return user;
    }
    return null;
};

export { register, login };

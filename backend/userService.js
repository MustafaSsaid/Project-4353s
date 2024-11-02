
import { query } from './db';

export const getUsers = async () => {
    const result = await query('SELECT * FROM user_credentials');
    return result.rows;
};

export const addUser = async (user) => {
    const result = await query(
        'INSERT INTO user_credentials (email, password) VALUES ($1, $2) RETURNING *',
        [user.email, user.password]
    );
    return result.rows[0];
};
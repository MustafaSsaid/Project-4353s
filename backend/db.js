//not actual, use locally hosted info

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Testing123',
    port: 5432,
});

// Test the connection

pool.connect()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));

module.exports = {
    query: (text, params) => pool.query(text, params),
};
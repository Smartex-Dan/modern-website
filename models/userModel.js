const db = require('../config/db');

const createUsersTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    await db.query(query);
    console.log('Users table ready!');
};

const findUserByEmail = async (email) => {
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0];
};

const createUser = async (name, email, hashedPassword) => {
    const { rows } = await db.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, hashedPassword]
    );
    return rows[0];
};

module.exports = { createUsersTable, findUserByEmail, createUser };
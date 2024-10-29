// database.js
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Criação da tabela de usuários, se não existir
db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cpf TEXT UNIQUE,
            password TEXT
        )`,
        (err) => {
            if (err) console.error('Erro ao criar a tabela:', err.message);
        }
    );
});

module.exports = db;

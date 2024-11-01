// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database');

const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = process.env.SECRET_KEY || 'chave_secreta';

// Rota de registro de usuários
app.post('/register', async (req, res) => {
    const { cpf, pg, nomecompleto, password } = req.body;
    if (!cpf || !password || !pg || !nomecompleto) return res.status(400).json({ error: 'Preencha todos os campos!' });

    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(`INSERT INTO users (cpf, pg, nomecompleto, password) VALUES (?, ?, ?, ?)`, [cpf, pg, nomecompleto, hashedPassword], (err) => {
        if (err) return res.status(500).json({ error: 'Erro ao registrar o usuário' });
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    });
});

// Rota de login com autenticação via CPF
app.post('/login', (req, res) => {
    const { cpf, password } = req.body;
    if (!cpf || !password) return res.status(400).json({ error: 'CPF e senha são obrigatórios' });

    db.get(`SELECT * FROM users WHERE cpf = ?`, [cpf], async (err, user) => {
        if (err) return res.status(500).json({ error: 'Erro ao buscar usuário' });
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: 'Senha incorreta' });

        const token = jwt.sign({ id: user.id, cpf: user.cpf }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: `Usuário CPF:${cpf} Autenticado com sucesso!`, token });
    });
});

// Rota de logout
app.post('/logout', authenticateToken, (req, res) => {
    // Se estiver usando um banco de dados para armazenar tokens, você pode removê-lo aqui
    // Exemplo: db.run(`DELETE FROM tokens WHERE userId = ?`, [req.user.id], (err) => {
    //     if (err) return res.status(500).json({ error: 'Erro ao realizar logout' });
    // });

    // Se não estiver armazenando tokens, você pode simplesmente informar que o logout foi bem-sucedido
    res.json({ message: 'Logout realizado com sucesso' });
});

// Middleware de autenticação para rotas protegidas
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // extrair o token sem o 'Bearer'
    if (!token) return res.status(401).json({ error: 'Token não fornecido' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });
        req.user = user;
        next();
    });
}

// Exemplo de rota protegida
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Acesso à rota protegida!', user: req.user });
});

app.get('/user', authenticateToken, (req, res) => {
    const userId = req.user.id;

    db.get(`SELECT id, cpf, pg, nomecompleto FROM users WHERE id = ?`, [userId], (err, user) => {
        if (err) return res.status(500).json({ error: 'Erro ao buscar dados do usuário' });
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
        
        res.json(user);
    });
});


//============ ARRANCHAMENTO =================

app.get('/arranchamentos/:cpf', authenticateToken, (req, res) => {
    const cpf = req.params.cpf;

    db.all(`SELECT * FROM arranchamentos WHERE user_cpf = ?`, [cpf], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Erro ao buscar arranchamentos' });
        res.json(rows);
    });
});

// Endpoint para adicionar um novo arranchamento
app.post('/arranchamentos', authenticateToken, (req, res) => {
    const { cpf, dataArranchamento, refeicao } = req.body;

    db.run(
        `INSERT INTO arranchamentos (user_cpf, data_arranchamento, refeicao) VALUES (?, ?, ?)`,
        [cpf, dataArranchamento, refeicao],
        (err) => {
            if (err) return res.status(500).json({ error: 'Erro ao agendar arranchamento' });
            res.json({ message: 'Arranchamento agendado com sucesso!' });
        }
    );
});

// Endpoint para cancelar um arranchamento
app.put('/arranchamentos/cancel', authenticateToken, (req, res) => {
    const { cpf, dataArranchamento, refeicao } = req.body;

    db.run(
        `UPDATE arranchamentos SET status = 'Cancelado' WHERE user_cpf = ? AND data_arranchamento = ? AND refeicao = ?`,
        [cpf, dataArranchamento, refeicao],
        (err) => {
            if (err) return res.status(500).json({ error: 'Erro ao cancelar arranchamento' });
            res.json({ message: 'Arranchamento cancelado com sucesso!' });
        }
    );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

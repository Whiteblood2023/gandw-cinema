const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET = 'gandw_supersecret';
const USERS_FILE = path.join(__dirname, 'users.json');

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Helper: Read users from JSON
function getUsers() {
    if (!fs.existsSync(USERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(USERS_FILE));
}

// Helper: Save users to JSON
function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Rota de cadastro
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    let users = getUsers();
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: 'Usuário já existe.' });
    }
    const hashed = bcrypt.hashSync(password, 10);
    users.push({ username, password: hashed });
    saveUsers(users);
    res.json({ message: 'Registrado com sucesso!' });
});

// Rota de login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();
    const user = users.find(u => u.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
    const token = jwt.sign({ username }, SECRET, { expiresIn: '2h' });
    res.json({ token });
});

// Middleware de autenticação
function auth(req, res, next) {
    const header = req.headers['authorization'];
    if (!header) return res.sendStatus(401);
    const token = header.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch {
        res.sendStatus(401);
    }
}

// Exemplo de rota protegida (filmes online)
app.get('/api/filmes', auth, (req, res) => {
    res.json([
        {
            titulo: "Homem-Aranha: Sem Volta Para Casa",
            imagem: "https://image.tmdb.org/t/p/w500/uJYYizSuA9Y3DCs0qS4qWvHfZg4.jpg",
            descricao: "Peter Parker precisa lidar com as consequências de sua identidade revelada.",
            online: true
        },
        {
            titulo: "Desafiando Gigantes",
            imagem: "https://upload.wikimedia.org/wikipedia/pt/0/05/Facing_the_Giants.jpg",
            descricao: "Filme cristão sobre fé e superação em um time de futebol americano.",
            online: true
        },
        {
            titulo: "Os Vingadores",
            imagem: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
            descricao: "Os heróis da Marvel se reúnem contra uma ameaça global.",
            online: true
        }
    ]);
});

// Servir o front-end buildado em produção
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
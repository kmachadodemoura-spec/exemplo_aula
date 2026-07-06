const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const PORTA = 3000;

const db = new DatabaseSync(path.join(__dirname, 'meubanco.db'));

db.exec(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_completo TEXT,
    email TEXT,
    data_nascimento TEXT,
    pais_favorito TEXT,
    jogador_favorito TEXT
)`);

const servidor = http.createServer(async (req, res) => {

    // ===== API GET =====
    if (req.url === '/api/usuarios' && req.method === 'GET') {
        const usuarios = db.prepare('SELECT * FROM usuarios ORDER BY id DESC').all();

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(usuarios));
        return;
    }

    // ===== API POST =====
    if (req.url === '/api/usuarios' && req.method === 'POST') {
        let corpo = '';

        for await (const pedaco of req) {
            corpo += pedaco;
        }

        const dados = JSON.parse(corpo);

        db.prepare(`
            INSERT INTO usuarios 
            (nome_completo, email, data_nascimento, pais_favorito, jogador_favorito)
            VALUES (?, ?, ?, ?, ?)
        `).run(
            dados.nome_completo,
            dados.email,
            dados.data_nascimento,
            dados.pais_favorito,
            dados.jogador_favorito
        );

        res.setHeader('Content-Type', 'text/plain');
        res.end('ok');
        return;
    }

    // ===== ARQUIVOS =====
    const nomeArquivo = req.url === '/' ? 'index.html' : req.url;

    if (nomeArquivo.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
    }

    if (nomeArquivo.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
    }

    if (nomeArquivo.endsWith('.html')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
    }

    fs.readFile(path.join(__dirname, nomeArquivo), (erro, conteudo) => {
        if (erro) {
            res.statusCode = 404;
            res.end('Arquivo não encontrado');
            return;
        }

        res.end(conteudo);
    });

});

servidor.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
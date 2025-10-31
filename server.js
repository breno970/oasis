// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/adicionar-tempo', (req, res) => {
    console.log('Tempo adicionado via clique no QR Code');
    res.json({ message: '1 minuto adicionado com sucesso!' });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

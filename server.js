const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite de 100 requisições por IP
    message: 'Muitas requisições. Por favor, tente novamente mais tarde.'
});
app.use(limiter);

// Rota para receber os dados do frontend
app.post('/submit-form', async (req, res) => {
    try {
        const formData = req.body;

        // Gera um número de inscrição aleatório
        const registrationNumber = Math.floor(1000 + Math.random() * 9000);
        formData['numero-inscricao'] = registrationNumber;

        // Envia os dados para o Formspree
        const response = await axios.post('https://formspree.io/f/xpwrbyee ', formData, {
            headers: { 'Content-Type': 'application/json' }
        });

        res.status(200).json({ message: 'Inscrição enviada com sucesso!', registrationNumber });
    } catch (error) {
        console.error('Erro ao enviar os dados:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Erro ao enviar os dados.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
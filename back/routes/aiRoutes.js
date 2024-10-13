const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const router = express.Router();

// Endpoint para enviar solicitudes a OpenAI GPT-4
router.post('/gpt4', async (req, res) => {
    try {
        const { prompt, responseSchema, filePaths } = req.body;

        // Crear form-data para adjuntar archivos
        const form = new FormData();
        if (filePaths && filePaths.length > 0) {
            filePaths.forEach((filePath, index) => {
                form.append(`file_${index}`, fs.createReadStream(filePath));
            });
        }

        // Agregar el prompt y el esquema de respuesta
        form.append('prompt', prompt);
        form.append('response_schema', JSON.stringify(responseSchema));

        // Hacer la solicitud a OpenAI GPT-4 API
        const apiKey = process.env.OPENAI_API_KEY; // Asegúrate de tener tu clave en el archivo .env
        const response = await axios.post('https://api.openai.com/v1/engines/gpt-4/completions', form, {
            headers: {
                ...form.getHeaders(),
                'Authorization': `Bearer ${apiKey}`
            }
        });

        // Responder con el resultado de GPT-4
        res.json(response.data);
    } catch (error) {
        console.error('Error en la solicitud a GPT-4:', error);
        res.status(500).json({ message: 'Error en la solicitud a GPT-4', error: error.message });
    }
});

module.exports = router;

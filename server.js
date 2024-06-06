const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;
const RESEND_API_KEY = 'TU_RESEND_API_KEY'; // Reemplaza con tu API key

app.use(bodyParser.json());

app.post('/send-code', async (req, res) => {
    const { email } = req.body;
    const verificationCode = crypto.randomBytes(3).toString('hex'); // Genera un código de 6 caracteres en hexadecimal

    try {
        const response = await axios.post(
            'https://api.resend.com/send',
            {
                to: email,
                subject: 'Your Verification Code',
                text: `Your verification code is: ${verificationCode}`
            },
            {
                headers: {
                    'Authorization': `Bearer ${RESEND_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        res.status(200).send({ success: true, code: verificationCode });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

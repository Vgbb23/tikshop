import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const port = Number(process.env.API_PORT || 8787);

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/fruitfy/pix/charge', async (req, res) => {
  const token = process.env.FRUITFY_API_TOKEN;
  const storeId = process.env.FRUITFY_STORE_ID;
  const productId = process.env.FRUITFY_PRODUCT_ID;
  const fruitfyApiBaseUrl = process.env.FRUITFY_API_BASE_URL || 'https://api.fruitfy.io';

  if (!token || !storeId || !productId) {
    return res.status(500).json({
      success: false,
      message: 'FRUITFY_API_TOKEN, FRUITFY_STORE_ID ou FRUITFY_PRODUCT_ID não configurados no .env',
    });
  }

  const { name, email, phone, cpf, valueCents } = req.body || {};
  const amount = Number(valueCents);

  if (!name || !email || !phone || !cpf || !Number.isFinite(amount) || amount <= 0) {
    return res.status(422).json({
      success: false,
      message: 'Payload inválido. Envie: name, email, phone, cpf e valueCents.',
    });
  }

  const payload = {
    name,
    email,
    phone,
    cpf,
    items: [
      {
        id: productId,
        value: Math.round(amount),
        quantity: 1,
      },
    ],
  };

  try {
    const response = await fetch(`${fruitfyApiBaseUrl}/api/pix/charge`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Store-Id': storeId,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const rawBody = await response.text();

    // Debug completo da integração Fruitfy para diagnosticar rejeição de campos.
    console.log('[Fruitfy][Request] payload:', JSON.stringify(payload));
    console.log('[Fruitfy][Response] status:', response.status, response.statusText);
    console.log('[Fruitfy][Response] headers:', JSON.stringify(Object.fromEntries(response.headers.entries())));
    console.log('[Fruitfy][Response] rawBody:', rawBody);

    try {
      const data = JSON.parse(rawBody);
      return res.status(response.status).json(data);
    } catch {
      return res.status(response.status).json({
        success: false,
        message: 'Resposta não-JSON da Fruitfy',
        rawBody,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro ao criar cobrança PIX na Fruitfy',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
});

app.listen(port, () => {
  console.log(`API local rodando em http://localhost:${port}`);
});

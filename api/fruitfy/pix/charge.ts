export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método não permitido' });
  }

  const token = process.env.FRUITFY_API_TOKEN;
  const storeId = process.env.FRUITFY_STORE_ID;
  const productId = process.env.FRUITFY_PRODUCT_ID;
  const fruitfyApiBaseUrl = process.env.FRUITFY_API_BASE_URL || 'https://api.fruitfy.io';

  if (!token || !storeId || !productId) {
    return res.status(500).json({
      success: false,
      message: 'FRUITFY_API_TOKEN, FRUITFY_STORE_ID ou FRUITFY_PRODUCT_ID não configurados.',
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
}

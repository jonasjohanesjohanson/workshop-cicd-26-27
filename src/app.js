import express from 'express';

const app = express();

// Aceita apenas strings numéricas finitas ('' e '  ' dariam 0 com Number()).
const toNumber = (v) => {
  if (typeof v !== 'string' || v.trim() === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/sum', (req, res) => {
  const a = toNumber(req.query.a);
  const b = toNumber(req.query.b);

  if (a === null || b === null) {
    return res.status(400).json({ error: 'Parâmetros "a" e "b" devem ser números' });
  }

  return res.status(200).json({ result: a + b });
});

export default app;
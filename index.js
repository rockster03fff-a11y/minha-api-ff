const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// SUAS CHAVES DE AUTENTICAÇÃO (coloque as chaves que você gerou)
const VALID_KEYS = [
  "ffapi_A7bX9kL2mN4pQ8rT6vW1yZ3cF5hJ0",
  // Adicione mais chaves aqui
];

// Endpoint da API
app.get('/api/ff/likes', (req, res) => {
  const { uid, region, auth } = req.query;
  
  // Validar parâmetros
  if (!uid || !region || !auth) {
    return res.status(400).json({
      developer: "Minha API FF",
      status: "error",
      message: "Parâmetros faltando: uid, region, auth são obrigatórios"
    });
  }
  
  // Validar auth key
  if (!VALID_KEYS.includes(auth)) {
    return res.status(401).json({
      developer: "Minha API FF",
      status: "error",
      message: "Auth key inválida"
    });
  }
  
  // Simular dados (aqui você conectaria com banco de dados real)
  const likesAtual = Math.floor(Math.random() * 20000) + 5000;
  const likesAdicionados = Math.floor(Math.random() * 300) + 100;
  
  res.json({
    developer: "Minha API FF",
    status: "success",
    player: {
      account_id: uid,
      nickname: "Player" + uid.slice(-4),
      level: Math.floor(Math.random() * 80) + 20,
      experience: Math.floor(Math.random() * 5000000) + 100000,
      server: region
    },
    likes: {
      before: likesAtual,
      after: likesAtual + likesAdicionados,
      added: likesAdicionados,
      status: 1
    },
    timestamp: new Date().toISOString()
  });
});

// Rota principal
app.get('/', (req, res) => {
  res.json({
    message: "API Free Fire - Online ✅",
    endpoint: "/api/ff/likes",
    parametros: "?uid={uid}&region={region}&auth={auth_key}"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});

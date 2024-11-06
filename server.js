const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/repositorios-csharp', async (req, res) => {
  try {
    const response = await axios.get('https://api.github.com/orgs/takenet/repos');
    const repos = response.data;

    const repositoriosCSharp = repos
      .filter(repo => repo.language === 'C#')
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      .slice(0, 5);

    const resultado = repositoriosCSharp.map(repo => ({
      image: repo.owner.avatar_url,
      title: repo.full_name,
      subtitle: repo.description
    }));

    res.status(200).json(resultado);
  } catch (error) {
    console.error('Erro ao buscar os repositórios:', error);
    res.status(500).json({ message: 'Erro ao buscar os repositórios do GitHub' });
  }
});

// Middleware para rotas não encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint não encontrado' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

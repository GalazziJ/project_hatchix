const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração da conexão MySQL
const db = mysql.createPool({
  host: 'localhost',
  user: 'admin',        // seu usuário MySQL
  password: '1234',     // sua senha MySQL
  database: 'hatchix'
});

// Teste conexão
db.getConnection((err, connection) => {
  if (err) {
    console.error('Erro de conexão ao banco:', err);
  } else {
    console.log('Conectado ao banco MySQL!');
    connection.release();
  }
});

// Rotas CRUD para pokemons

// GET all pokemons
app.get('/api/pokemons', (req, res) => {
  db.query('SELECT * FROM pokemons', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// POST novo pokemon
app.post('/api/pokemons', (req, res) => {
  const { name, ha, types, egg_groups, generation, has_ha, obtained } = req.body;
  const query = 'INSERT INTO pokemons (name, ha, types, egg_groups, generation, has_ha, obtained) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [name, ha, types, egg_groups, generation, has_ha, obtained], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, message: 'Pokémon adicionado com sucesso!' });
  });
});

// PUT atualizar pokemon
app.put('/api/pokemons/:id', (req, res) => {
  const { id } = req.params;
  const { name, ha, types, egg_groups, generation, has_ha, obtained } = req.body;
  const query = 'UPDATE pokemons SET name=?, ha=?, types=?, egg_groups=?, generation=?, has_ha=?, obtained=? WHERE id=?';
  db.query(query, [name, ha, types, egg_groups, generation, has_ha, obtained, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Pokémon atualizado com sucesso!' });
  });
});

// DELETE pokemon
app.delete('/api/pokemons/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM pokemons WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Pokémon deletado com sucesso!' });
  });
});

// Rodar servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const dogs = [
  { id: 1, name: 'Milo', breed: 'Golden Retriever', age: '2 years', city: 'Pune', mode: 'Hire', price: 1200 },
  { id: 2, name: 'Luna', breed: 'Border Collie', age: '1 year', city: 'Bengaluru', mode: 'Adopt', price: 18000 }
];
app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'DogsLub API' }));
app.get('/api/dogs', (req, res) => {
  const q = String(req.query.q || '').toLowerCase();
  const mode = String(req.query.mode || '');
  res.json(dogs.filter(d => (!mode || d.mode === mode) && (!q || `${d.name} ${d.breed} ${d.city}`.toLowerCase().includes(q))));
});
app.post('/api/dogs', (req, res) => {
  const { name, breed, age, city, mode, price } = req.body;
  if (!name || !breed || !city) return res.status(400).json({ error: 'name, breed and city are required' });
  const dog = { id: Date.now(), name, breed, age: age || 'Not specified', city, mode: mode || 'Adopt', price: price || 0 };
  dogs.unshift(dog);
  res.status(201).json(dog);
});
app.use(express.static(path.join(__dirname, '..')));
app.listen(PORT, () => console.log(`DogsLub API running at http://localhost:${PORT}`));

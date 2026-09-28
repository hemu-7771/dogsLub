const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dogs = [
  {
    id: 1,
    name: 'Milo',
    breed: 'Golden Retriever',
    age: '2 years',
    city: 'Pune',
    type: 'Hire',
    price: '₹1,200 / day',
    image: '🐕',
    description: 'Friendly and gentle, perfect for family trips and weekend outings.'
  },
  {
    id: 2,
    name: 'Luna',
    breed: 'Border Collie',
    age: '1 year',
    city: 'Bengaluru',
    type: 'Adopt',
    price: '₹18,000',
    image: '🐶',
    description: 'Active and intelligent companion for energetic families.'
  },
  {
    id: 3,
    name: 'Bruno',
    breed: 'Labrador',
    age: '3 years',
    city: 'Mumbai',
    type: 'Sell',
    price: '₹25,000',
    image: '🐕‍🦺',
    description: 'Well-trained, loyal, and social around people and other pets.'
  },
  {
    id: 4,
    name: 'Coco',
    breed: 'Beagle',
    age: '8 months',
    city: 'Delhi',
    type: 'Hire',
    price: '₹900 / day',
    image: '🦮',
    description: 'Playful and sweet, excellent for short coaching or adoption trials.'
  },
  {
    id: 5,
    name: 'Pepper',
    breed: 'Indie',
    age: '2 years',
    city: 'Chennai',
    type: 'Adopt',
    price: 'Free adoption',
    image: '🐾',
    description: 'Calm and loving dog ready for a caring forever home.'
  },
  {
    id: 6,
    name: 'Oreo',
    breed: 'Husky',
    age: '4 years',
    city: 'Hyderabad',
    type: 'Sell',
    price: '₹32,000',
    image: '🐺',
    description: 'Beautiful coat, active personality, and excellent outdoor companion.'
  }
];

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'DogsLub backend is running' });
});

app.get('/api/dogs', (req, res) => {
  const { q = '', type = 'All' } = req.query;
  const search = String(q).toLowerCase();

  const filtered = dogs.filter((dog) => {
    const matchesType = type === 'All' || dog.type === type;
    const matchesSearch =
      !search ||
      [dog.name, dog.breed, dog.city, dog.description].join(' ').toLowerCase().includes(search);

    return matchesType && matchesSearch;
  });

  res.json(filtered);
});

app.post('/api/dogs', (req, res) => {
  const { name, breed, age, city, type, price, description, image } = req.body;

  if (!name || !breed || !city) {
    return res.status(400).json({ error: 'Name, breed, and city are required.' });
  }

  const newDog = {
    id: Date.now(),
    name,
    breed,
    age: age || 'Not specified',
    city,
    type: type || 'Adopt',
    price: price || 'Ask for price',
    image: image || '🐶',
    description: description || 'A loving companion looking for a great home.'
  };

  dogs.unshift(newDog);
  res.status(201).json(newDog);
});

app.delete('/api/dogs/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = dogs.findIndex((dog) => dog.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Dog not found.' });
  }

  const [removed] = dogs.splice(index, 1);
  res.json({ message: `${removed.name} removed successfully.` });
});

app.listen(port, () => {
  console.log(`DogsLub backend running on http://localhost:${port}`);
});

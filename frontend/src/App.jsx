import { useEffect, useMemo, useState } from 'react';

const defaultDogs = [
  { id: 1, name: 'Milo', breed: 'Golden Retriever', age: '2 years', city: 'Pune', type: 'Hire', price: '₹1,200 / day', image: '🐕', description: 'Friendly and gentle for family outings.' },
  { id: 2, name: 'Luna', breed: 'Border Collie', age: '1 year', city: 'Bengaluru', type: 'Adopt', price: '₹18,000', image: '🐶', description: 'Very active, intelligent, and playful.' },
  { id: 3, name: 'Bruno', breed: 'Labrador', age: '3 years', city: 'Mumbai', type: 'Sell', price: '₹25,000', image: '🐕‍🦺', description: 'Loyal and social with children and families.' },
  { id: 4, name: 'Coco', breed: 'Beagle', age: '8 months', city: 'Delhi', type: 'Hire', price: '₹900 / day', image: '🦮', description: 'Happy, curious, and great for short stays.' }
];

function App() {
  const [dogs, setDogs] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [status, setStatus] = useState('Loading dogs...');
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    city: '',
    type: 'Adopt',
    price: '',
    description: '',
    image: '🐶'
  });

  const fetchDogs = async () => {
    try {
      const response = await fetch('/api/dogs');
      const data = await response.json();
      setDogs(data.length ? data : defaultDogs);
      setStatus(data.length ? 'Dogs available now!' : 'Showing sample listings.');
    } catch (error) {
      setDogs(defaultDogs);
      setStatus('Using demo listings because the backend is not running yet.');
    }
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  const filteredDogs = useMemo(() => {
    return dogs.filter((dog) => {
      const matchesType = selectedType === 'All' || dog.type === selectedType;
      const query = search.toLowerCase();
      const matchesSearch =
        !query ||
        [dog.name, dog.breed, dog.city, dog.description].join(' ').toLowerCase().includes(query);

      return matchesType && matchesSearch;
    });
  }, [dogs, search, selectedType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/dogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Unable to create listing');
      }

      const newDog = await response.json();
      setDogs((prev) => [newDog, ...prev]);
      setFormData({
        name: '',
        breed: '',
        age: '',
        city: '',
        type: 'Adopt',
        price: '',
        description: '',
        image: '🐶'
      });
      setStatus(`New listing added: ${newDog.name}`);
    } catch (error) {
      setDogs((prev) => [{ id: Date.now(), ...formData }, ...prev]);
      setStatus('Listing added locally. Backend will sync when the server is running.');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Remove this dog listing?');
    if (!confirmDelete) return;

    try {
      await fetch(`/api/dogs/${id}`, { method: 'DELETE' });
      setDogs((prev) => prev.filter((dog) => dog.id !== id));
      setStatus('Listing removed successfully.');
    } catch (error) {
      setDogs((prev) => prev.filter((dog) => dog.id !== id));
      setStatus('Listing removed from UI.');
    }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">dogs<span>Lub</span> 🐾</div>
        <nav>
          <a href="#home">Home</a>
          <a href="#listings">Listings</a>
          <a href="#sell">Sell a Dog</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">trusted dog marketplace</p>
            <h1>Find the dog that fits your life.</h1>
            <p className="lead">
              Discover healthy, friendly dogs for adoption, hire, or sale. DogsLub helps people
              connect with responsible dog owners and caring homes.
            </p>
            <div className="hero-actions">
              <a href="#listings" className="primary-btn">Browse dogs</a>
              <a href="#sell" className="secondary-btn">List a dog</a>
            </div>
            <div className="stats">
              <div><strong>1200+</strong><span>happy matches</span></div>
              <div><strong>96%</strong><span>trusted owners</span></div>
              <div><strong>24/7</strong><span>support</span></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="dog-emoji">🐶</div>
            <div className="floating-card">Verified and safe listings</div>
          </div>
        </section>

        <section className="listing-section" id="listings">
          <div className="section-head">
            <div>
              <p className="eyebrow">available now</p>
              <h2>Featured dogs</h2>
            </div>
            <div className="status-pill">{status}</div>
          </div>

          <div className="toolbar">
            <input
              type="text"
              placeholder="Search by breed, name or city"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option value="All">All</option>
              <option value="Adopt">Adopt</option>
              <option value="Hire">Hire</option>
              <option value="Sell">Sell</option>
            </select>
          </div>

          <div className="card-grid">
            {filteredDogs.map((dog) => (
              <article className="dog-card" key={dog.id}>
                <div className="dog-art" aria-label={dog.name}>{dog.image}</div>
                <div className="dog-content">
                  <div className="card-topline">
                    <span className="badge">{dog.type}</span>
                    <button className="inline-delete" onClick={() => handleDelete(dog.id)}>Remove</button>
                  </div>
                  <h3>{dog.name}</h3>
                  <p className="meta">{dog.breed} • {dog.age}</p>
                  <p className="meta">📍 {dog.city}</p>
                  <p className="description">{dog.description}</p>
                  <div className="card-footer">
                    <strong>{dog.price}</strong>
                    <button className="small-btn">Contact owner</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="sell-section" id="sell">
          <div className="section-head">
            <div>
              <p className="eyebrow">share your dog</p>
              <h2>List a dog for adoption, hire or sale</h2>
            </div>
          </div>

          <form className="listing-form" onSubmit={handleSubmit}>
            <div className="field-row">
              <input name="name" placeholder="Dog name" value={formData.name} onChange={handleChange} required />
              <input name="breed" placeholder="Breed" value={formData.breed} onChange={handleChange} required />
            </div>
            <div className="field-row">
              <input name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
              <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="field-row">
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="Adopt">Adopt</option>
                <option value="Hire">Hire</option>
                <option value="Sell">Sell</option>
              </select>
              <input name="price" placeholder="Price or hire amount" value={formData.price} onChange={handleChange} />
            </div>
            <div className="field-row single">
              <input name="image" placeholder="Emoji or icon (example: 🐶)" value={formData.image} onChange={handleChange} />
            </div>
            <textarea
              name="description"
              placeholder="Describe the dog, health, behavior and needs"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
            <button className="primary-btn submit-btn" type="submit">Publish listing</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;

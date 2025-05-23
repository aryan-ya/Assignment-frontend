import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="center">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="grid">
      {products.map(product => (
        <Link to={`/products/${product.id}`} className="card" key={product.id}>
          <img src={product.image} alt={product.title} className="product-img" />
          <div className="info">
            <h5 className="title">{product.title}</h5>
            <p className="price">₹{product.price}</p>
            <p className="category">{product.category}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => setProduct(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="center">Loading product...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="detail-container">
      <div className="detail-img">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="detail-info">
        <h2>{product.title}</h2>
        <h4 className="price">₹{product.price}</h4>
        <p className="category">Category: {product.category}</p>
        <p>{product.description}</p>
        <Link to="/" className="back-btn">← Back to Products</Link>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    axios.get(`${API_BASE_URL}/gallery/list/`)
      .then(res => {
        setImages(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Gallery fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);
  if (loading) return (
    <div className="loader-wrapper">
      <div className="custom-spinner"></div>
      <p className="loader-text">Yuklanmoqda...</p>
    </div>
  );
  
  
    if (error) return <div>Error: {error}</div>;

  return (
    <div className="Gallery">
      <h2>Universitet Galleriyasi</h2>
      <div className="masonry-container">
        {images.map((item, index) => (
          <img
            key={index}
            src={`${API_BASE_URL}${item.image}`}
            alt={item.alt_text || `Gallery image ${index + 1}`}
            loading="lazy"
            className="masonry-item"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Gallery;

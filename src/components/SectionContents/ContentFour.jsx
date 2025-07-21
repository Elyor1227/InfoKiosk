import React, { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL; 
function ContentFour({ data }) {
  const images = [
    data?.photo_1,
    data?.photo_2,
    data?.photo_3,
    data?.photo_4,
    data?.photo_5
  ].filter(Boolean); // faqat mavjud rasmlarni olamiz

  const [selectedImage, setSelectedImage] = useState(images[0]);

  if (!images.length) return <p>Rasmlar mavjud emas</p>;

  return (
    <div style={{margin: '20px auto'}}>
      <div className="main-image">
        <img
          src={`${API_BASE}/${selectedImage}`}
          alt="Main view"
        />
      </div>
      <div className="thumbnails">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={`${API_BASE}/${img}`}
            alt={`Thumb ${idx}`}
            className={img === selectedImage ? "active" : ""}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
    </div>
  );
}
export default ContentFour
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Elonlar_tadbirlar() {
  const [elonlar, setElonlar] = useState([]);
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_URL; 
  useEffect(() => {
    axios.get(`${API_BASE}/events/all`) // ← API manzilini moslang
      .then((res) => setElonlar(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Ichki ElonCard komponenti
  const ElonCard = ({ elon }) => {
    const handleClick = () => {
      navigate(`/elon/${elon.id}`, { state: { elon } });
    };

    return (
      <div className="elon-card" onClick={handleClick}>
        <img src={`${API_BASE}/${elon.photo}`} alt={elon.title_uz} className="elon-image" />
        <div className="elon-content">
          <div className="elon_">
            <a className="elon-link">E'lon</a>
            <span className="elon-date">{elon.day}</span>
          </div>
          <p className="elon-description">{elon.title_uz?.slice(0, 70)}...</p>
          <div className="elon-details">
            <span>⏰ {elon.time?.slice(0, 5)}</span>
            <span>📍 {elon.location}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="elon-tadbirlar-container">
      <h2 className="elon-title">E`lonlar va tadbirlar</h2>
      {elonlar.map((elon) => (
        <ElonCard key={elon.id} elon={elon} />
      ))}
    </div>
  );
}

export default Elonlar_tadbirlar;

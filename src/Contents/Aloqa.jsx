import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./Aloqa.css"; // CSS fayl alohida berilgan

const API_BASE = import.meta.env.VITE_API_URL; 

function Aloqa() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE}/contact/`)
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => {
        console.error("Aloqa ma'lumotlarini olishda xatolik:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="Aloqa">
      <h1 className="title">Aloqa Markazi</h1>
      <div className="aloqa">
        <img src="/images/OBJECTS.png" alt="aloqa-img" className="top-img" />

        {loading ? (
          <p className="loading">Yuklanmoqda...</p>
        ) : (
          <div className="btns">
            {contacts.map((item) => (
              <div className="btn" key={item.id}>
                <div className="logo">
                  <img className="btn-img" src="/images/tell.svg" alt="logo-tell" />
                </div>
                <div className="btn-text" style={{display:'flex', justifyContent:'space-around', alignItems: 'center', width: '100%'}}>
                  <div className="name-number">
                    <p className="name">{item.name}</p>
                    <p className="phone">{item.phone_number}</p>
                  </div>
                  <div className="qr_code">
                    <p style={{marginBottom: '10px'}}>Telegram:</p>
                    <img src={item.qr_code} alt="qr_code" style={{width: '120px', height: '120px'}}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Aloqa;

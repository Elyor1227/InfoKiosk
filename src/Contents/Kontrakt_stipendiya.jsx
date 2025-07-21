import React, { useState, useEffect } from "react";
import axios from "axios";

function Kontrakt_stipendiya() {
    const API_BASE = import.meta.env.VITE_API_URL; 
  const [activeTab, setActiveTab] = useState("contract");
  const [videoUrl, setVideoUrl] = useState("");
  const [scholarships, setScholarships] = useState([]);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [faqList, setFaqList] = useState([]);
  // const [isOpen, setIsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };


  // 1. Video URL olish
  useEffect(() => {
    axios
    .get(`${API_BASE}/fees/contracts/`)
      .then((res) => {
        if (res.data.length > 0) {
          console.log(res.data);
          setVideoUrl(res.data[0].url_video);
        }
      })
      .catch((err) => console.error("Video URL olishda xatolik:", err));
    }, []);
    
    // 2. Stipendiyalar ro'yxatini olish
  useEffect(() => {
    axios
    .get(`${API_BASE}/fees/scholarships/`)
    .then((res) => {
        const data = res.data.map((item) => ({
          id: item.id,
          name: item.name_uz,
          image: item.photo,
        }));
        setScholarships(data);
      })
      .catch((error) =>
        console.error("Stipendiyalarni olishda xatolik:", error)
      );
  }, []);

  // 3. FAQ olish selectedScholarship o'zgarganda
  useEffect(() => {
    if (selectedScholarship?.id) {
      axios
        .get(
          `${API_BASE}/fees/qa/${selectedScholarship.id}/list/`
        )
        .then((res) => {
          setFaqList(res.data);
        })
        .catch((err) => console.error("FAQ olishda xatolik:", err));
      }
    }, [selectedScholarship]);
    // console.log(videoUrl);
const originalUrl = videoUrl; // yoki API'dan kelgan URL

let embedUrl = null;

if (originalUrl && originalUrl.startsWith("http")) {
  try {
    const videoId = new URLSearchParams(new URL(originalUrl).search).get("v");
    if (videoId) {
      embedUrl = `${API_BASE}/embed/${videoId}`;
    }
  } catch (err) {
    console.error("URL parsing error:", err);
  }
}

    
    return (
    <div className="contract-scholarships-container">
      <h2>Kontrakt va stipendiyalar</h2>

      <div className="tabs">
        <button
          className={activeTab === "contract" ? "active" : ""}
          onClick={() => {
            setSelectedScholarship(null);
            setActiveTab("contract");
          }}
        >
          Kontrakt to‘lov
        </button>
        <button
          className={activeTab === "scholarships" ? "active" : ""}
          onClick={() => {
            setSelectedScholarship(null);
            setActiveTab("scholarships");
          }}
        >
          Stipendiyalar
        </button>
      </div>

      {activeTab === "contract" && (
        <div className="contract-section">
          <div className="contract-banner">
            <div className="contract-text">
              <h3>Kontrakt.edu.uz platformasi</h3>
              <p>
                Bu platforma orqali talabalar kontrakt shartnomasini yuklab
                olish, hisob va qarzdorlikni tekshirish hamda onlayn to‘lovlarni
                amalga oshirish mumkin.
              </p>
              <a
                href="https://www.kontrakt.edu.uz"
                target="_blank"
                rel="noopener noreferrer"
              >
                Rasmiy sayt: https://www.kontrakt.edu.uz
              </a>
            </div>
            <div className="contract-img">
              <img src="/images/kontraktimg.png" alt="" />
            </div>
          </div>
          <div className="video-guide">
            <h3>Video qo‘llanma</h3>
            <iframe
              width="560"
              height="315"
              src={embedUrl}
              // src="https://www.youtube.com/embed/1hrj8-mr7HQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {activeTab === "scholarships" && !selectedScholarship && (
        <div className="scholarships-section">
          <h3>Davlat nomli stipendiyalar</h3>
          <div className="scholarships-list">
            {scholarships.map((scholar) => (
              <div
                key={scholar.id}
                className="scholarship-card"
                onClick={() => setSelectedScholarship(scholar)}
              >
                <img src={scholar.image} alt={scholar.name} />
                <p>{scholar.name} nomidagi davlat stipendiyasi</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "scholarships" && selectedScholarship && (
        <div className="scholarship-details">
          <div className="scholarship-details-text">
            <img src={selectedScholarship.image} alt="" />
            <h3>{selectedScholarship.name} nomidagi davlat stipendiyasi</h3>
          </div>

          {/* <div className="faq2">
            {faqList.length > 0 ? (
              faqList.map((item, idx) => (
                <>
            <div
              onClick={() => setIsOpen(!isOpen)}
              key={idx}
              style={{
                padding: '10px 16px',
                cursor: 'pointer',
                backgroundColor: '#fff',
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{border: '1px solid #333', width:'100%', height: '50px', display:'flex', alignItems: 'center', justifyContent:'space-between',  padding: "10px 20px", borderRadius: 10}}>
                <h3 style={{ fontSize: '24px', margin: 0, color: '#333', }}>{item.question_uz}</h3>
              <span style={{ display: 'flex', alignItems: 'center', color: '#333' }}>
                {isOpen ? (
                  <i style={{ fontSize: '25px', marginTop: '10px' }} className="fi fi-tr-angle-small-up"></i>
                ) : (
                  <i style={{ fontSize: '25px', marginTop: '10px' }} className="fi fi-tr-angle-small-down"></i>
                )}
              </span>
              </div>
            </div>
              {isOpen && (
                <div style={{ padding: '20px 16px', margin: '10px 20px', backgroundColor: '#F2F2F7', fontSize: '20px', color: '#333', borderRadius: 10 }}>
                  {item.answer_uz && (
                    <div dangerouslySetInnerHTML={{ __html: item.answer_uz }} />
                  )}
                </div>
              )}
                </>
              ))
            ) : (
              <p>Savollar mavjud emas</p>
            )}
          </div> */}
          <div className="faq2">
      {faqList.length > 0 ? (
        faqList.map((item, idx) => (
          <div key={idx}>
            <div
              onClick={() => toggleFAQ(idx)}
              style={{
                padding: '10px 16px',
                cursor: 'pointer',
                backgroundColor: '#fff',
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{
                border: '1px solid #333',
                width: '100%',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: "10px 20px",
                borderRadius: 10
              }}>
                <h3 style={{ fontSize: '24px', margin: 0, color: '#333' }}>{item.question_uz}</h3>
                <span style={{ display: 'flex', alignItems: 'center', color: '#333' }}>
                  {openIndex === idx ? (
                    <i style={{ fontSize: '25px', marginTop: '10px' }} className="fi fi-tr-angle-small-up"></i>
                  ) : (
                    <i style={{ fontSize: '25px', marginTop: '10px' }} className="fi fi-tr-angle-small-down"></i>
                  )}
                </span>
              </div>
            </div>

            {openIndex === idx && (
              <div style={{
                padding: '20px 16px',
                margin: '10px 20px',
                backgroundColor: '#F2F2F7',
                fontSize: '20px',
                color: '#333',
                borderRadius: 10
              }}>
                {item.answer_uz && (
                  <div dangerouslySetInnerHTML={{ __html: item.answer_uz }} />
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Savollar mavjud emas</p>
      )}
    </div>
        </div>
      )}
    </div>
  );
}

export default Kontrakt_stipendiya;

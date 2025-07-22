import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Oquv_bolimi() {
  const [activeTab, setActiveTab] = useState("fakultetlar");
  const [selectedFacultet, setSelectedFacultet] = useState(null);
  const navigate = useNavigate();

  const [faculties, setFaculties] = useState([]);
  const [cafedras, setCafedras] = useState([]);
  const [centres, setCentres] = useState([]);
  const [sections, setSections] = useState([]);

  const API_BASE = import.meta.env.VITE_API_URL; 

  useEffect(() => {
    axios
      .get(`${API_BASE}/study/faculties/`)
      .then((res) => setFaculties(res.data))
      .catch((err) => console.error("Fakultetlar xato:", err));

    axios
      .get(`${API_BASE}/study/cafedras/`)
      .then((res) => setCafedras(res.data))
      .catch((err) => console.error("Kafedralar xato:", err));

    axios
      .get(`${API_BASE}/study/centres/`)
      .then((res) => setCentres(res.data))
      .catch((err) => console.error("Markazlar xato:", err));

    axios
      .get(`${API_BASE}/study/sections/`)
      .then((res) => setSections(res.data))
      .catch((err) => console.error("Bo‘limlar xato:", err));
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedFacultet(null);
  };

  return (
    <div className="oquv-bolimi-container">
      <h1 className="oquv-bolimi-title">O’quv bo’limi</h1>

      {/* Tab tugmalari */}
      <div className="tugmalar">
        {["fakultetlar", "kafedralar", "markazlar", "bolimlar"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => handleTabChange(tab)}
          >
            {(() => { 
              switch (tab) {
                case "fakultetlar":
                  return "Fakultetlar";
                case "kafedralar":
                  return "Kafedralar";
                case "markazlar":
                  return "Markazlar";
                case "bolimlar":
                  return "Bo‘limlar";
                default:
                  return tab;
              }
            })()}
          </button>
        ))}
      </div>

      {/* Kontent qismi */}
      <div className="kontent">
        {activeTab === "fakultetlar" && !selectedFacultet && (
          <div className="facultet-cards">
            {faculties.map((f) => (
              <div
                key={f.id}
                className="facultet-card"
                onClick={() => navigate(`/detail/faculties/${f.name_uz}/${f.id}`)}
              >
                <img src={f.image} alt={f.name_uz} />
                <p>{f.name_uz}</p>
              </div>
            ))}
          </div>
        )}

        {selectedFacultet && (
          <div className="imgbox">
            <img src={selectedFacultet.image} alt={selectedFacultet.name_uz} />
          </div>
        )}

        {activeTab === "kafedralar" && (
          <div>
            <h2>Barcha kafedralar</h2>
            <div className="departments-list">
              {cafedras.map((d) => (
                <div key={d.id} className="department-card" onClick={() => navigate(`/detail/cafedras/${d.name_uz}/${d.id}`)}>
                  <div className="blue-bar" />
                  <span className="department-name">{d.name_uz}</span>
                  <i className="fi fi-rr-angle-small-right" style={{fontSize: 32, marginRight: 10}}></i>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "markazlar" && (
          <div>
            <h2>Barcha markazlar</h2>
            <div className="departments-list">
              {centres.map((d) => (
                <div key={d.id} className="department-card" onClick={() => navigate(`/detail/centres/${d.name_uz}/${d.id}`)}>
                  <div className="blue-bar" />
                  <span className="department-name">{d.name_uz}</span>
                  <i className="fi fi-rr-angle-small-right" style={{fontSize: 32, marginRight: 10}}></i>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "bolimlar" && (
          <div>
            <h2>Barcha bo‘limlar</h2>
            <div className="departments-list">
              {sections.map((d) => (
                <div key={d.id} className="department-card" onClick={() => navigate(`/detail/sections/${d.name_uz}/${d.id}`)}>
                  <div className="blue-bar" />
                  <span className="department-name">{d.name_uz}</span>
                  <i className="fi fi-rr-angle-small-right" style={{fontSize: 32, marginRight: 10}}></i>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Oquv_bolimi;

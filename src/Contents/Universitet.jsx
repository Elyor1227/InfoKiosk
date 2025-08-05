import { useEffect, useState } from 'react';
import axios from 'axios';

const Universitet = () => {
  const [stats, setStats] = useState(null);
  const [graduates, setGraduates] = useState([]);
  const [selectedGrad, setSelectedGrad] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_URL; // O'zingizning API manzilingizni yozing

  useEffect(() => {
    const fetchUniversityData = async () => {
      try {
        // Universitet statistikasi
        const statsRes = await axios.get(`${API_BASE_URL}/sections/78/`, {
        });
        setStats(statsRes.data.university);

        // Mashhur bitiruvchilar
        const gradsRes = await axios.get(`${API_BASE_URL}/university/celebrities/`);
        setGraduates(gradsRes.data);
      } catch (err) {
        console.error('Xatolik:', err);
      }
    };

    fetchUniversityData();
  }, []);

  const openModal = (grad) => setSelectedGrad(grad);
  const closeModal = () => setSelectedGrad(null);

  if (!stats) return (
  <div className="loader-wrapper">
    <div className="custom-spinner"></div>
    <p className="loader-text">Yuklanmoqda...</p>
  </div>
);

  const statsList = [
    { icon: '👨‍🏫', label: 'Professor-o‘qituvchilar soni', value: stats.tech_staff_num },
    { icon: '🎓', label: 'Talabalar soni', value: stats.student_num },
    { icon: '📘', label: 'Doktorantlar soni', value: stats.doctorants_num },
    { icon: '🏫', label: 'Auditoriyalar soni', value: stats.auditory_num },
    { icon: '📚', label: 'Taʼlim yoʻnalishlar', value: stats.study_path_num },
    { icon: '🌍', label: 'Qo‘shma-dasturlar', value: stats.uni_programs },
  ];

  return (
    <div className="university-container">
      <h2>Universitet haqida</h2>

      {/* Statistikalar */}
      <div className="stats-grid">
        {statsList.map((stat, index) => (
          <div className="stat-box" key={index}>
            <div className="icon">{stat.icon}</div>
            <div className="stat-box-child">
              <div className="label">{stat.label}</div>
              <div className="value">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tarixiy ma'lumot */}
      <div className="description-box">
        <p>{stats.info_uz}</p>
      </div>

      {/* Bitiruvchilar */}
      <h3 style={{fontSize: "32px"}}>Mashhur bitiruvchilar</h3>
      <div className="graduates-list">
        {graduates.map((grad, i) => (
          <div className="graduate-card" key={i} onClick={() => openModal(grad)}>
            <img src={grad.photo} alt={grad.full_name} />
            <p>{grad.full_name}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedGrad && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>×</button>
            <img src={selectedGrad.photo} alt={selectedGrad.full_name} className="modal-img" />
            <h3>{selectedGrad.full_name}</h3>
            <p><strong>Kasbi:</strong> {selectedGrad.occupation_uz}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Universitet;


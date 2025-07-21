import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function SelectedElonPage() {
    const API_BASE = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [images, setImages] = useState([]);
  const elon = state?.elon;
  useEffect(() => {
    axios.get(`${API_BASE}/events/${id}`) // ← API manzilini moslang
      .then((res) => setImages(res.data.images))
      .catch((err) => console.error(err));
  }, []);

  if (!elon) {
    return <div>E’lon topilmadi! <button onClick={() => navigate(-1)}>Orqaga</button></div>;
  }

  return (
    <div className="selected-elon">
        <h2 className="title">{elon.title_uz}</h2>   
        <img src={`${API_BASE}/${elon.photo}`} alt={elon.title_uz} className="selected-elon-image" />
        <div className="selected-elon-details">
          <div className="elon_1">
            <span>⏰ {elon.time?.slice(0, 5)}</span>
            <span>📍 {elon.location}</span>
          </div>
          <span className="selected-elon-date">{elon.day}</span>
        </div>
        <div className="formattedtext">{elon.info_uz}</div>
        <div className="elon-images">
            {
                images.map((image)=> (
                    <img src={`${API_BASE}/${image.photo}`} alt="elon-img" />
                ))
            }
        </div>
    </div>
  );
}

export default SelectedElonPage;

import "../index.css";
import { useNavigate } from "react-router-dom";

function BottomNavbar() {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <button onClick={() => navigate(-1)} aria-label="Orqaga qaytish"><i className="fi fi-rr-undo-alt"></i></button>
      <button onClick={() => navigate('/')} aria-label="Bosh sahifa"><i className="fi fi-rr-home"></i></button>
      <button onClick={() => navigate('gallery')} aria-label="Galeriya"><i className="fi fi-rr-picture"></i></button>
    </footer>
  );
}

export default BottomNavbar;

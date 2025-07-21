import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BottomNavbar from "./components/BottomNavbar";
import Main2 from "./components/Main2";
import Gallery from "./components/Gallery";
// import Contents
import Abiturentlaruchun from "./Contents/Abiturentlaruchun";
import Oquv_jadvallari from "./Contents/O'quv_jadvallari";
import Kontrakt_stipendiya from "./Contents/Kontrakt_stipendiya";
import Elektron_kutubxona from "./Contents/Elektron_kutubxona";
import Oquv_bolimi from "./Contents/O'quv_bo'limi";

import Aloqa from "./Contents/Aloqa";
import Universitet from "./Contents/Universitet";
import Navigatsiya from "./Contents/Navigatsiya";
import Elonlar_tadbirlar from "./Contents/Elonlar_tadbirlar";
import "./index.css";
import './style.css'
import SectionPage from "./pages/SectionPage";
import SubsectionPage from "./pages/SubsectionPage";
import SelectedElonPage from "./pages/SelectedElonPage";
import TuzilmaPage from "./pages/TuzilmaPage"

function App() {
  const API_BASE = import.meta.env.VITE_API_URL;
  const [data, setData] = useState({})
  useEffect(() => {
    axios.get(`${API_BASE}/display/`)
      .then(res => {
        setData(res.data)
        // 🟢 Global CSS o‘zgaruvchisini o‘rnatish
        if (res.data?.color) {
          document.documentElement.style.setProperty('--main-color', res.data.color);
        }
      })
      .catch(err => console.error(err));
  }, []);
  return (
    <div className="app-container">
      <Router>
      <Navbar data={data}/>
        <Routes>
          <Route path="/" element={<Main2 />} />
          <Route path="/sections/94" element={<Abiturentlaruchun />} />
          <Route path="/sections/82" element={<Oquv_jadvallari />} />
          <Route path="/sections/81" element={<Kontrakt_stipendiya />} />
          <Route path="/src/components/Contents/Elektron_kutubxona.jsx" element={<Elektron_kutubxona />} />
          <Route path="/sections/79" element={<Oquv_bolimi />} />
          <Route path="/sections/84/" element={<Aloqa />} />
          <Route path="/sections/78" element={<Universitet />} />
          <Route path="/src/components/Contents/Navigatsiya.jsx" element={<Navigatsiya />} />
          <Route path="/sections/80/" element={<Elonlar_tadbirlar />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="/sections/:id" element={<SectionPage />} />
          <Route path="/subsection/:subId" element={<SubsectionPage />} />
          <Route path="/elon/:id" element={<SelectedElonPage />} />
          <Route path="/detail/:type/:SectionName/:id" element={<TuzilmaPage />} />
        </Routes>
      <BottomNavbar />
    </Router>
    </div>
  );
}

export default App;
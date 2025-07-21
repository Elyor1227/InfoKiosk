import { useEffect, useState } from "react";
import "../index.css";
import { useLanguage } from "../LanguageContext";

const languages = [
  {
    key: "uz",
    label: "O'zbekcha",
    short: "UZ",
    flag: "/images/flags/uzb.png",
  },
  {
    key: "ru",
    label: "Русский",
    short: "РУ",
    flag: "/images/flags/rus.png",
  },
  {
    key: "en",
    label: "English",
    short: "EN",
    flag: "/images/flags/uk.png",
  },
];

function Navbar(data) {
  const { language, changeLanguage } = useLanguage();
  const [dateTime, setDateTime] = useState(new Date());
  const API_BASE = import.meta.env.VITE_API_URL; 
  const [selectedLang, setSelectedLang] = useState(
    languages.find(lang => lang.key === language) || languages[0]
  );
  const [open, setOpen] = useState(false);
  console.log(data);

  const handleSelect = (lang) => {
    setSelectedLang(lang);
    changeLanguage(lang.key);
    setOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Til o'zgarganida selectedLang ni yangilash
  useEffect(() => {
    setSelectedLang(languages.find(lang => lang.key === language) || languages[0]);
  }, [language]);

  const weekdays = {
    uz: ["Yak", "Dush", "Sesh", "Chor", "Pay", "Jum", "Shan"],
    ru: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  };

  const day = dateTime.getDate();
  const weekday = weekdays[language][dateTime.getDay()];

  const formattedTime = dateTime.toLocaleTimeString(language === 'uz' ? 'uz-UZ' : language, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <nav className="navbar">
      <div className="navbarbox">
        <div className="logo">
          {data.data && data.data.logo && (
  <img src={`${API_BASE}/${data.data.logo}`} alt="Logo" />
)}
          <div className="text">{data.data[`name_${language}`]}</div>
        </div>
        
        <div className="lang-time">
          <div className="language-selector">
            <div className="selected" onClick={() => setOpen(!open)}>
              <img src={selectedLang.flag} alt={selectedLang.short} />
              <span>{selectedLang.short}</span>
              <span className={`arrow ${open ? 'up' : 'down'}`}></span>
            </div>
            
            {open && (
              <div className="dropdown">
                {languages
                  .filter((lang) => lang.key !== selectedLang.key)
                  .map((lang) => (
                    <div
                      key={lang.key}
                      className="dropdown-item"
                      onClick={() => handleSelect(lang)}
                    >
                      <img src={lang.flag} alt={lang.short} />
                      <span>{lang.short}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="time">
            <p>{formattedTime}</p>
            <p>
              {weekday}, {day}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
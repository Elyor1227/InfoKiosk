import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
function Main2() {
  const API_BASE = import.meta.env.VITE_API_URL; 
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [sections, setSections] = useState([]);
  const [ads, setAds] = useState([]);
  const [qrs, setQrs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [itemsToShow, setItemsToShow] = useState(8);

useEffect(() => {
  const updateItemsToShow = () => {
    const width = window.innerWidth;
    if (width >= 1199) {
      setItemsToShow(8); // katta ekran - 4x2
    } else if (width >= 768) {
      setItemsToShow(9); // o‘rta ekran - 3x3
    } else {
      setItemsToShow(6); // kichik ekran - 2x3
    }
  };

  updateItemsToShow(); // boshlanishida ishga tushadi
  window.addEventListener("resize", updateItemsToShow);
  return () => window.removeEventListener("resize", updateItemsToShow);
}, []);

  // Translations
  const translations  = useMemo(() => ({
    title: {
      uz: 'Talabalar uchun raqamli yordamchi',
      ru: 'Цифровой помощник для студентов',
      en: 'Digital assistant for students',
    },
    showMore: {
      uz: "Barchasini ko'rsatish",
      ru: 'Показать все',
      en: 'Show all',
    },
    showLess: {
      uz: 'Kamroq ko’rsatish',
      ru: 'Показать меньше',
      en: 'Show less',
    },
    socialText: {
      uz: 'Bizni ijtimoiy tarmoqlarda kuzating',
      ru: 'Следите за нами в социальных сетях',
      en: 'Follow us on social media', 
    },
  }), [language]);

  const toggleButtons = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sections
        const sectionsResponse = await fetch(`${API_BASE}/sections/`);
        const sectionsData = await sectionsResponse.json();
        setSections(Array.isArray(sectionsData) ? sectionsData : [sectionsData]);

        // Fetch ads
        const adsResponse = await fetch(`${API_BASE}/display/ads/`);
        const adsData = await adsResponse.json();
        setAds(adsData);

        // Fetch qrs
        const qrsResponse = await fetch(`${API_BASE}/display/qrs/`);
        const qrsData = await qrsResponse.json();
        setQrs(qrsData);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(sections);
if (loading) return (
  <div className="loader-wrapper">
    <div className="custom-spinner"></div>
    <p className="loader-text">Yuklanmoqda...</p>
  </div>
);


  if (error) return <div>Error: {error}</div>;

  // Generate path for section
  const getPathForSection = (section) => {
    return `/sections/${section.id}`;
  };

  // Get section name based on language
  const getSectionName = (section) => {
    return section[`name_${language}`] || section.name_uz || 'Section';
  };

  // Get section icon
  const getSectionIcon = (section) => {
    const defaultIcon = <i className="fi fi-rr-apps" />;
    // Check if photo is a valid Flaticon class
    if (section.photo && section.photo.startsWith('fi-rr-')) {
      return <i className={`fi ${section.photo}`} />;
    }
    // Fallback for invalid or missing photo
    return defaultIcon;
  };
console.log(itemsToShow);
  return (
    <main className="main">
      <div className="images">
        {ads.map((ad, index) => (
          <img key={index} src={ad.photo} alt={`Ad ${index}`} />
        ))}
      </div>

      <div className="main-text">
        <h2>{translations.title[language]}</h2>
      </div>

      {/* <div className="grid-boxes">
        {sections
          .filter((section) => section.is_active)
          .sort((a, b) => a.order - b.order)
          .slice(0, isExpanded ? sections.length : itemsToShow)
          .map((section) => (
            <Link to={getPathForSection(section)} key={section.id}>
              <div className="box">
                <div className="text-icon">{getSectionIcon(section)}</div>
                <div className="text-btn">{getSectionName(section)}</div>
              </div>
            </Link>
          ))}
      </div> */}
      <TransitionGroup className="grid-boxes">
  {sections
    .filter((section) => section.is_active)
    .sort((a, b) => a.order - b.order)
    .slice(0, isExpanded ? sections.length : itemsToShow)
    .map((section) => (
      <CSSTransition
        key={section.id}
        timeout={400}
        classNames="section-anim"
      >
        <Link to={getPathForSection(section)}>
          <div className="box">
            <div className="text-icon">{getSectionIcon(section)}</div>
            <div className="text-btn">{getSectionName(section)}</div>
          </div>
        </Link>
      </CSSTransition>
    ))}
</TransitionGroup>

      {sections.filter((section) => section.is_active).length > 8 ? (
        <button className="view-all" onClick={toggleButtons}>
          {isExpanded ? (
            <div className="button-title">
              {translations.showLess[language]} <i className="fi fi-br-angle-up"></i>
            </div>
          ) : (
            <div className="button-title">
              {translations.showMore[language]} <i className="fi fi-br-angle-down"></i>
            </div>
          )}
        </button>
      ) : (
        <></>
      )}
        <div className="qr-codes">
          <div className="link-text">
            <h1>{translations.socialText[language]}</h1>
          </div>
          <div className="links">
            {qrs.map((qr, index) => (
              <div className="qr-key" key={index}>
                <div className="link">
                  <img src={qr.photo} alt={`QR ${index}`} />  
                  <div className="link-text1">{qr.url}</div>
                </div>
                </div>
            ))}
          </div>
        </div>
    </main>
  );
}

export default Main2;

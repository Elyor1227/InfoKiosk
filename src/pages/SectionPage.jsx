import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { List } from "antd";
import { renderContent } from "./util";

const SectionPage = () => {
  const API_BASE = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE}/sections/${id}/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSection(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch section error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getColumnCount = () => {
    if (section?.content?.some((item) => item.content_type === "eight")) {
      return 4;
    }
    if (section?.content?.some((item) => item.content_type === "three")) {
      return 3;
    }
    return 1;
  };

if (loading) return (
  <div className="loader-wrapper">
    <div className="custom-spinner"></div>
    <p className="loader-text">Yuklanmoqda...</p>
  </div>
);
  if (error) return <div className="error">Error: {error}</div>;
  if (!section) return <div className="error">Section topilmadi</div>;

  return (
    <div className="section-page">
      <h1>{section[`name_${language}`] || section.name_uz}</h1>
      {section.sub_sections && section.sub_sections.length > 0 ? (
        section.sub_sections.map((subsection) => (
          <div
            key={subsection.id}
            className="department-card"
            onClick={() => navigate(`/subsection/${subsection.id}`)}
          >
            <div className="blue-bar" />
            <span className="department-name">
              {subsection[`title_${language}`] || subsection.title_uz}
            </span>
            <i className="fi fi-rr-angle-small-right"></i>
          </div>
        ))
      ) : section.content && section.content.length > 0 ? (
        <div className="content-list">
          <List
            grid={{ gutter: 0, column: () => getColumnCount }}
            dataSource={section.content}
            renderItem={(item) => (
              <List.Item>
                {renderContent(item, language)}
              </List.Item>
            )}
          />
        </div>
      ) : (
        <p className="no-content">Subsection yoki content mavjud emas</p>
      )}
    </div>
  );
};

export default SectionPage;
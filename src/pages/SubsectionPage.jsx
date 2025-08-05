// src/pages/SubsectionPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { renderContent } from '../pages/util';
import { List } from 'antd';

const SubsectionPage = () => {
  const API_BASE = import.meta.env.VITE_API_URL;
  const { subId } = useParams();
  const { language } = useLanguage();

  const [subsection, setSubsection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE}/custom/subsections/${subId}/`);
        const data = await response.json();
        console.log(data);
        setSubsection(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [subId]);
  console.log(subsection);
  const getColumnCount = () => {
  if (subsection.content.some(item => item.content_type === 'eight')) {
    return 4;
  }
  if (subsection.content.some(item => item.content_type === 'three')) {
    return 3;
  }
  return 1;
};
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!subsection) return <div>Subsection topilmadi</div>;

  return (
    <div style={{marginBottom: '80px', display: 'flex', justifyContent:'center', alignItems: 'flex-start', flexDirection:'column', margin:30, paddingTop: 15, backgroundColor: '#fff', borderRadius: 10}} >
      {subsection.contents && subsection.contents.length > 0 ? (
        <>
        <h1 style={{marginLeft: '60px'}}>{subsection[`title_${language}`] || subsection.title_uz}</h1>
                <List
                  grid={{ gutter: 0, column: () => getColumnCount }}
                  dataSource={subsection.contents}
                  style={{marginBottom:'50px'}}
                  renderItem={(item) => (
                    <List.Item style={{ margin: '0 auto', padding: 0, borderRadius: '0' }}>
                      {renderContent(item, language)}
                    </List.Item>
                  )}
                />
      </>
      ) : (
        <p style={{margin: '30px', fontFamily: 'Inter Tight', width: '80%'}}>Content mavjud emas</p>
      )}
    </div>
  );
};

export default SubsectionPage;

import { Card } from "antd";
import { useState } from "react";


const ContentFive = ({ data, language }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="content-five">
      <div className="accordion-container">
        <div
          className="accordion-header"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3>{data[`title_${language}`] || data.title_uz}</h3>
          <span className="accordion-icon">
            {isOpen ? (
              <i className="fi fi-tr-angle-small-up"></i>
            ) : (
              <i className="fi fi-tr-angle-small-down"></i>
            )}
          </span>
        </div>
        {isOpen && (
          <div className="accordion-content">
            {data.text1_uz && (
              <div dangerouslySetInnerHTML={{ __html: data[`text1_${language}`] || data.text1_uz }} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentFive;

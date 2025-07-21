import { Card } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons"; 

const ContentSeven = ({ data, language }) => {
  const getText = (field) => data[`${field}_${language}`];
  const API_BASE = import.meta.env.VITE_API_URL; 

  return (
    <div className="content-seven">
      <div className="card-content">
        <div className="text-content">
          {getText("title") && <h2>{getText("title")}</h2>}
          {getText("text1") && <h3>{getText("text1")}</h3>}
          {getText("text2") && <p>{getText("text2")}</p>}
          {getText("text3") && (
            <p>
              <CalendarOutlined style={{ marginRight: 8 }} />
              {getText("text3")}
            </p>
          )}
          {getText("text4") && (
            <p>
              <ClockCircleOutlined style={{ marginRight: 8 }} />
              {getText("text4")}
            </p>
          )}
          {getText("text5") && (
            <p>
              <PhoneOutlined style={{ marginRight: 8 }} />
              {getText("text5")}
            </p>
          )}
          {getText("text6") && (
            <p>
              <MailOutlined style={{ marginRight: 8 }} />
              {getText("text6")}
            </p>
          )}
        </div>
        <div className="card-image">
          <img
            src={`${API_BASE}/${data.photo_1}`}
            alt="Rasm"
          />
        </div>
      </div>
    </div>
  );
};

export default ContentSeven;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useLanguage } from "../LanguageContext";
import { Card } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";

function DetailPage() {
  const API_BASE = import.meta.env.VITE_API_URL;
  const { language } = useLanguage();
  const { type, SectionName, id } = useParams();
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      setLoading(true);
      try {
        const url = `${API_BASE}/study/${id}/`;
        const res = await axios.get(url);
        setStaffList(Array.isArray(res.data.staff) ? res.data.staff : []);
        setLoading(false);
      } catch (err) {
        console.error("Fetch staff error:", err.response?.data || err);
        setError(err.response?.data?.message || "Xatolik yuz berdi");
        setStaffList([]);
        setLoading(false);
      }
    };

    fetchStaff();
  }, [id]);

  const getText = (item, field) =>
    item[`${field}_${language}`] || item[`${field}_uz`] || "";

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="detail-page">
      <h1>{SectionName}</h1>
      {staffList.length > 0 ? (
        staffList.map((item) => (
          <Card key={item.id} className="staff-card">
            <div className="card-content">
              <div className="text-content">
                <h2>
                  {item.name} {item.surname} {item.father_name}
                </h2>
                <h3>{getText(item, "position")}</h3>
                {item.working_days && (
                  <p>
                    <CalendarOutlined className="icon" />
                    {item.working_days}
                  </p>
                )}
                {item.working_hours && (
                  <p>
                    <ClockCircleOutlined className="icon" />
                    {item.working_hours}
                  </p>
                )}
                {item.phone_number && (
                  <p>
                    <PhoneOutlined className="icon" />
                    {item.phone_number}
                  </p>
                )}
                {item.email && (
                  <p>
                    <MailOutlined className="icon" />
                    {item.email}
                  </p>
                )}
              </div>
              <div className="card-image">
                <img
                  src={`${API_BASE}${item.image}`}
                  alt="Rasm"
                />
              </div>
            </div>
          </Card>
        ))
      ) : (
        <div className="no-content">Hech qanday ma'lumot topilmadi</div>
      )}
    </div>
  );
}

export default DetailPage;
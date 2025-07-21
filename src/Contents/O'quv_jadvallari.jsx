import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

const Oquvjadvallari = () => {
  const courses = [1, 2, 3, 4, 5];
  const [selectedCourse, setSelectedCourse] = useState(1);
  const [groupsByCourse, setGroupsByCourse] = useState({});
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedGroupDetails, setSelectedGroupDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const getGroupsForCourse = () => groupsByCourse[selectedCourse] || [];

  const fetchAllGroups = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/sections/82/`);
      const data = response.data;
      const courseGroups = {
        1: data.first_course || [],
        2: data.second_course || [],
        3: data.third_course || [],
        4: data.fourth_course || [],
        5: data.fifth_course || [],
      };
      setGroupsByCourse(courseGroups);

      // Avtomatik ravishda birinchi kursdagi birinchi guruhni tanlash
      if (data.first_course && data.first_course.length > 0) {
        setSelectedGroupId(data.first_course[0].id);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGroupById = async (groupId) => {
    if (!groupId) return;
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/schedule/${groupId}/`);
      setSelectedGroupDetails(response.data);
    } catch (error) {
      console.error("Error fetching group schedule:", error);
      setSelectedGroupDetails(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllGroups();
  }, []);

  useEffect(() => {
    if (selectedGroupId) {
      fetchGroupById(selectedGroupId);
    } else {
      setSelectedGroupDetails(null);
    }
  }, [selectedGroupId]);

  useEffect(() => {
    // Kurs o'zgarganda, yangi kursdagi birinchi guruhni tanlash
    const groups = getGroupsForCourse();
    if (groups.length > 0) {
      setSelectedGroupId(groups[0].id);
    } else {
      setSelectedGroupId(null);
    }
  }, [selectedCourse, groupsByCourse]);

  return (
    <div className="container">
      <h2 className="title">Dars Jadvallari</h2>

      <div className="selectors">
        <div className="select-box">
          <label htmlFor="course">Kursni tanlang:</label>
          <select
            id="course"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(parseInt(e.target.value))}
          >
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}-Kurs
              </option>
            ))}
          </select>
        </div>

        <div className="select-box">
          <label htmlFor="group">Guruhni tanlang:</label>
          <select
            id="group"
            value={selectedGroupId || ""}
            onChange={(e) => setSelectedGroupId(e.target.value)}
          >
            {getGroupsForCourse().map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="schedule-area">
        {loading ? (
          <div className="loading">Yuklanmoqda...</div>
        ) : selectedGroupDetails?.schedule_photo ? (
          <img
            style={{ marginBottom: '40px' }}
            className="schedule-img"
            src={`${API_BASE}${selectedGroupDetails.schedule_photo}`}
            alt="Dars jadvali"
          />
        ) : selectedGroupDetails ? (
          <p className="no-image">Jadval rasmi mavjud emas</p>
        ) : (
          <p className="select-message">Iltimos, kurs va guruhni tanlang</p>
        )}
      </div>
    </div>
  );
};

export default Oquvjadvallari;
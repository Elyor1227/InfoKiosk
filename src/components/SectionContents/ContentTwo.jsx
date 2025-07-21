const ContentCard = ({ data, language }) => {
  if (!data) return null;
  const API_BASE = import.meta.env.VITE_API_URL; 
  const title = data[`title_${language}`] || data.title_uz;
  const text = data[`text1_${language}`] || data.text1_uz;

  return (
    <div className="content-two">
      <div className="content-box">
        {data.photo_1 && (
          <img
            src={`${API_BASE}/${data.photo_1}`}
            alt="Content"
            className="content-image"
          />
        )}
        <div className="content-text">
          {title && (
            <div
              className="content-title"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
          {text && (
            <div
              className="content-body"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentCard;

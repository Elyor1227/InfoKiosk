const ContentOne = ({ data, language }) => {
  if (!data) return null;

  return (
    <div className="content-one">
      <div
        className="text-content tiptap"
        dangerouslySetInnerHTML={{ __html: data[`text1_${language}`] || data.text1_uz }}
      />
    </div>
  );
};

export default ContentOne;
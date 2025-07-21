import ContentOne from '../components/SectionContents/ContentOne';
import ContentTwo from '../components/SectionContents/ContentTwo';
import ContentThree from '../components/SectionContents/ContentThree';
import ContentFour from '../components/SectionContents/ContentFour';
import ContentFive from '../components/SectionContents/ContentFive';
import ContentSix from '../components/SectionContents/ContentSix';
import ContentSeven from '../components/SectionContents/ContentSeven';

export  const renderContent = (item, language) => {
  const props = { data: item, language };

  switch (item.content_type) {
    case 'one':
      return <ContentOne {...props} />;
    case 'two':
      return <ContentTwo {...props} />;
    case 'three':
      return <ContentThree {...props} />;
    case 'four':
      return <ContentFour {...props} />;
    case 'five':
      return <ContentFive {...props} />;
    case 'six':
      return <ContentSix {...props} />;
    case 'seven':
      return <ContentSeven {...props} />;
    default:
      return <div>Unknown content type: {item.content_type}</div>;
  }
};
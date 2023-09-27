import { useState } from 'react';
import { AccordionItem } from './AccordionItem.type';
import { AccordionSummary } from '@mui/material';
import { ArrowUp, ArrowDown } from '@/assets/icons';
import { styles } from './AccordionItem.style';

const AccordionItem: React.FC<AccordionItem> = ({ sectionTitle, children }) => {
  const [isActive, setIsActive] = useState(false);

  const styleArr = styles(isActive);

  const handleAccordionClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <AccordionSummary
        style={styleArr[0].accordionStyle}
        onClick={handleAccordionClick}
        expandIcon={isActive ? <ArrowUp /> : <ArrowDown />}
      >
        {sectionTitle}
      </AccordionSummary>
      <div style={styleArr[0].panelStyle}>{children}</div>
    </div>
  );
};

export default AccordionItem;

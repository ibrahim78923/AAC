import { AccordionItem } from './AccordionItem.type';
import { AccordionSummary, Collapse } from '@mui/material';
import { ArrowUp, ArrowDown } from '@/assets/icons';
import { UseAccordionItem } from './UseAccordionItem';
import { styles } from './AccordionItem.style';

const AccordionItem: React.FC<AccordionItem> = ({ sectionTitle, children }) => {
  const { handleAccordionClick, isActive } = UseAccordionItem();
  const styleArr = styles(isActive);
  return (
    <div>
      <AccordionSummary
        style={styleArr[0].accordionStyle}
        onClick={handleAccordionClick}
        expandIcon={isActive ? <ArrowUp /> : <ArrowDown />}
      >
        {sectionTitle}
      </AccordionSummary>
      <Collapse in={isActive} sx={styleArr[0].panelStyle}>
        {children}
      </Collapse>
    </div>
  );
};

export default AccordionItem;

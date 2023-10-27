import { AccordionItemI } from './Accordion.interface';
import { AccordionSummary, Collapse } from '@mui/material';
import { ArrowUpIcon, ArrowDownIcon } from '@/assets/icons';
import { useAccordion } from './useAccordion';
import { styles } from './Accordion.style';

const Accordion: React.FC<AccordionItemI> = ({ sectionTitle, children }) => {
  const { handleAccordionClick, isActive } = useAccordion();
  const styleArr = styles(isActive);
  return (
    <div>
      <AccordionSummary
        style={styleArr[0].accordionStyle}
        onClick={handleAccordionClick}
        expandIcon={isActive ? <ArrowUpIcon /> : <ArrowDownIcon />}
      >
        {sectionTitle}
      </AccordionSummary>
      <Collapse in={isActive} sx={styleArr[0].panelStyle}>
        {children}
      </Collapse>
    </div>
  );
};

export default Accordion;

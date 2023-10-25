import { AccordionItemI } from './AccordionItem.interface';
import { AccordionSummary, Collapse } from '@mui/material';
import { ArrowUpIcon, ArrowDownIcon } from '@/assets/icons';
import { styles } from './AccordionItem.style';
import { useAccordionItem } from './useAccordionItem';

export const AccordionItem: React.FC<AccordionItemI> = ({
  sectionTitle,
  children,
}) => {
  const { handleAccordionClick, isActive } = useAccordionItem();
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

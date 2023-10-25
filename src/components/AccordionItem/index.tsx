import { AccordionItemI } from './AccordionItem.interface';
import { AccordionSummary, Collapse } from '@mui/material';
import { ArrowUpIcon, ArrowDownIcon } from '@/assets/icons';
import { styles } from './AccordionItem.style';
import { useAccordionItem } from './useAccordionItem';

export const AccordionItem: React.FC<AccordionItemI> = ({
  sectionTitle,
  children,
}) => {
  const { handleAccordionClick, isActive, theme } = useAccordionItem();
  return (
    <div>
      <AccordionSummary
        style={styles.accordionStyle(theme)}
        onClick={handleAccordionClick}
        expandIcon={isActive ? <ArrowUpIcon /> : <ArrowDownIcon />}
      >
        {sectionTitle}
      </AccordionSummary>
      <Collapse in={isActive} sx={styles.panelStyle(isActive, theme)}>
        {children}
      </Collapse>
    </div>
  );
};

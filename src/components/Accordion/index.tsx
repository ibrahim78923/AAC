import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { ArrowUp, ArrowDown } from '@/assets/icons';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  sxProps: object;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  sxProps,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Accordion
        elevation={0}
        sx={{
          borderRadius: '4px !important',
          bgcolor: '#35456D',
          '& .Mui-expanded': { minHeight: '0 !important' },
          ...sxProps,
        }}
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
      >
        <AccordionSummary
          sx={{
            color: '#fff',
            fontWeight: '500',
            fontSize: '14px',
            '& .Mui-expanded': {
              m: '16px 0 !important',
            },
            '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
              transform: 'rotate(0deg)',
            },
          }}
          expandIcon={expanded ? <ArrowUp /> : <ArrowDown />}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <div>{title}</div>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: '#fff' }}>{children}</AccordionDetails>
      </Accordion>
    </>
  );
};

export default AccordionItem;

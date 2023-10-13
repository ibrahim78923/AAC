import React, { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';

const PlanFeatures = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        disableGutters
        sx={{
          '&.MuiAccordion': {
            '&.Mui-expanded': {
              boxShadow: 'theme.customShadows.z8',
              borderRadius: '8px',
            },
            '&.Mui-disabled': {
              backgroundColor: 'transparent',
            },
          },
          '& .MuiAccordionSummary-root': {
            backgroundColor: '#1F305D',
            color: '#fff',
            borderRadius: '8px',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1a-header"
        >
          <Typography>Sales</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
        disableGutters
        sx={{
          marginTop: '2rem',
          '& .MuiAccordionSummary-root': {
            backgroundColor: '#1F305D',
            color: '#fff',
            borderRadius: '8px',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Marketting</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default PlanFeatures;

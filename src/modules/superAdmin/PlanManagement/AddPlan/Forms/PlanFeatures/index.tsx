import React, { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
} from '@mui/material';
import CheckboxLabel from './CheckboxLabel';
import { AirSalesCategories } from './PlanFeatures.data';

import { v4 as uuidv4 } from 'uuid';

const PlanFeatures = () => {
  const [expanded, setExpanded] = useState<string | false>(
    'plan-features-sales-accordion',
  );

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        expanded={expanded === 'plan-features-sales-accordion'}
        onChange={handleChange('plan-features-sales-accordion')}
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
          aria-controls="plan-features-sales-accordion-content"
          id="plan-features-sales-accordion-header"
        >
          <Typography variant="h4">Sales</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            {AirSalesCategories?.map((item: any) => (
              <Grid item xs={3} key={uuidv4()}>
                <Box sx={{ width: 'max-content' }}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked={item?.checked} />}
                      label={
                        <CheckboxLabel name={item?.name} desc={item?.desc} />
                      }
                    />
                  </FormGroup>
                </Box>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'plan-features-marketing-accordion'}
        onChange={handleChange('plan-features-marketing-accordion')}
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
          aria-controls="plan-features-marketing-accordion-content"
          id="plan-features-marketing-accordion-header"
        >
          <Typography variant="h4">Marketing</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            {AirSalesCategories?.map((item: any) => (
              <Grid item xs={3} key={uuidv4()}>
                <Box sx={{ width: 'max-content' }}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked={item?.checked} />}
                      label={
                        <CheckboxLabel name={item?.name} desc={item?.desc} />
                      }
                    />
                  </FormGroup>
                </Box>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default PlanFeatures;

import React from 'react';

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
import ListAccordion from './ListAccordion';
import { useModules } from './UseModules';

const Modules = () => {
  const { expanded, handleChange } = useModules();

  return (
    <div>
      <Accordion
        expanded={expanded === 'plan-air-sales-accordion'}
        onChange={handleChange('plan-air-sales-accordion')}
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
          aria-controls="plan-air-sales-accordion-content"
          id="plan-air-sales-accordion-header"
        >
          <Typography variant="h4">Air Sales</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListAccordion />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'plan-marketing-accordion'}
        onChange={handleChange('plan-marketing-accordion')}
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
          aria-controls="plan-marketing-accordion-content"
          id="plan-marketing-accordion-header"
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

export default Modules;

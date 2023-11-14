import React from 'react';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControlLabel,
  Box,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { SwitchBtn } from '@/components/SwitchButton';

import { useModules } from './useModules';
import SubModulesAccordion from './SubModulesAccordian';

import { v4 as uuidv4 } from 'uuid';
import { permisionsPlanManagement } from '@/constants/permission-keys';

const Modules = ({ methods, handleSubmit }: any) => {
  const { theme, isAccordionExpanded, handleExpandAccordionChange } =
    useModules();

  return (
    <div>
      {permisionsPlanManagement?.map((feature: string) => (
        <Accordion
          key={uuidv4()}
          expanded={isAccordionExpanded === feature}
          onChange={handleExpandAccordionChange(feature)}
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
              backgroundColor: theme?.palette?.blue?.main,
              color: theme?.palette?.common?.white,
              borderRadius: '8px',
              marginBottom: '11px',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`accordion-${feature}`}
            id={`accordion-${feature}`}
          >
            <Box display="flex" alignItems="center">
              <FormControlLabel control={<SwitchBtn />} label="" />
              <Typography variant="h4">{feature?.Modules}</Typography>
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            <SubModulesAccordion
              subModules={feature?.Sub_Modules}
              methods={methods}
              handleSubmit={handleSubmit}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Modules;

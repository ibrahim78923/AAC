import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  FormControlLabel,
  Grid,
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SwitchBtn } from '@/components/SwitchButton';
import { RolesAccordionsTicketsData } from '../UpsertRoleAndRightForm/UpsertRoleAndRightForm.data';
import RolesAndRightSubAccordion from '../RolesAndRightSubAccordion';
import useRolesAndRight from '../useRolesAndRight';

const RolesAndRightFormAccordion = () => {
  const { theme } = useRolesAndRight();

  return (
    <>
      <Grid item xs={12}>
        <Stack direction="row">
          <Typography variant="h4">Permissions</Typography>
          <Typography style={{ color: theme?.palette?.error?.main }}>
            *
          </Typography>
        </Stack>
        {Object?.entries(RolesAccordionsTicketsData)?.map(
          ([sectionTitle, sectionData]) => (
            <Accordion
              key={sectionTitle}
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
                },
                mt: 1,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${sectionTitle}-content`}
                id={`${sectionTitle}-header`}
              >
                <Box display="flex" alignItems="center">
                  <FormControlLabel control={<SwitchBtn />} label="" />
                  <Typography>{sectionTitle}</Typography>
                </Box>
              </AccordionSummary>

              <AccordionDetails>
                <AccordionDetails>
                  <RolesAndRightSubAccordion
                    sectionData={{ title: sectionTitle, data: sectionData }}
                  />
                </AccordionDetails>
              </AccordionDetails>
            </Accordion>
          ),
        )}
      </Grid>
    </>
  );
};

export default RolesAndRightFormAccordion;

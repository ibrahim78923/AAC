import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
  Box,
  FormControlLabel,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { SwitchBtn } from '@/components/SwitchButton';

import usePermissionAccordion from './usePermissionAccordion';
import DashboardAccordion from './DashboardAccordion';
import DealsAccordion from './DealsAccordion';

const PermissionsAccordion = () => {
  const { theme, isAccordionExpanded, handleExpandAccordionChange } =
    usePermissionAccordion();
  return (
    <Stack gap={3}>
      <Accordion
        expanded={isAccordionExpanded === 'dashboard'}
        onChange={handleExpandAccordionChange('dashboard')}
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
            color: theme.palette?.common?.white,
            borderRadius: '8px',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="dashboard"
          id="dashboard"
        >
          <Box display="flex" alignItems="center">
            <FormControlLabel control={<SwitchBtn />} label="" />
            <Typography variant="h4">Dashboard</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <DashboardAccordion />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={isAccordionExpanded === 'deals'}
        onChange={handleExpandAccordionChange('deals')}
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
            color: theme.palette?.common?.white,
            borderRadius: '8px',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="deals"
          id="deals"
        >
          <Box display="flex" alignItems="center">
            <FormControlLabel control={<SwitchBtn />} label="" />
            <Typography variant="h4">Deals</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <DealsAccordion />
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default PermissionsAccordion;

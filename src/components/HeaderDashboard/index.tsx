import { Box, Typography } from '@mui/material';
import { SingleDropdownButton } from '../SingleDropdownButton';
import { ActionsFunction, DashboardFunction } from './HeaderDashboard.data';

export const HeaderDashboard = ({}: any) => {
  return (
    <>
      <Box>
        <Typography variant="h3">Service</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4" sx={{ marginTop: 2 }}>
          Hi Sam ! Happy to See You again
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <SingleDropdownButton
            dropdownOptions={ActionsFunction}
            dropdownName="Action"
          />
          <SingleDropdownButton
            dropdownOptions={DashboardFunction}
            dropdownName="Dashboards"
          />
        </Box>
      </Box>
    </>
  );
};

import { Box, Typography } from '@mui/material';
import { SingleDropdownButton } from '../../../../components/SingleDropdownButton';
import { ActionsFunction, DashboardFunction } from './HeaderDashboard.data';
import { styles } from './HeaderDashboard.styles';

export const HeaderDashboard = ({}: any) => {
  return (
    <>
      <Box>
        <Typography sx={styles?.serviceText}>Service</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4" sx={{ marginTop: 2 }}>
          <span style={{ color: '#1F305D' }}>Hi Sam !</span> Happy to See You
          again
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

import { Box, Typography } from '@mui/material';
import { SingleDropdownButton } from '../SingleDropdownButton';

export const HeaderDashboard = ({}: any) => {
  return (
    <>
      <Box>
        <Typography variant="h3">Service</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">Hi Sam ! Happy to See You again</Typography>
        <SingleDropdownButton />
      </Box>
    </>
  );
};

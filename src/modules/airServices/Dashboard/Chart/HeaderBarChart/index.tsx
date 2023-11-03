import { Box, Typography } from '@mui/material';
import { SingleDropdownButton } from '../../../../../components/SingleDropdownButton';
import { actionsFunction } from './HeaderBarChart.data';

export const HeaderBarChart = ({}: any) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginRight: 3,
        }}
      >
        <Typography variant="h4">Tickets based on Status</Typography>
        <SingleDropdownButton
          dropdownOptions={actionsFunction}
          dropdownName="Status"
        />
      </Box>
    </>
  );
};

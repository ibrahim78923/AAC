import { Box, Grid, Typography } from '@mui/material';
import { SingleDropdownButton } from '../../../../../components/SingleDropdownButton';
import { ActionsFunction, availabilityHeader } from './HeaderPieChart.data';

export const HeaderPieChart = ({}: any) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginRight: 3,
        }}
      >
        <Typography variant="h4">Agent Availability</Typography>
        <SingleDropdownButton
          dropdownOptions={ActionsFunction}
          dropdownName="All Dept."
        />
      </Box>
      <Grid container spacing={5}>
        {availabilityHeader.map((department) => (
          <Grid item key={index} sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {department.icon}
              <Typography>{department.title}</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography>{department.titlenumber}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

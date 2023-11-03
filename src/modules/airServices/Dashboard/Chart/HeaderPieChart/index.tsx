import { Box, Grid, Typography } from '@mui/material';
import { SingleDropdownButton } from '../../../../../components/SingleDropdownButton';
import { actionsFunction, availabilityHeader } from './HeaderPieChart.data';
import { v4 as uuidv4 } from 'uuid';

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
          dropdownOptions={actionsFunction}
          dropdownName="All Dept."
        />
      </Box>
      <Grid container spacing={5}>
        {availabilityHeader.map((department) => (
          <Grid item sx={{ mt: 2 }} key={uuidv4()}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {department.icon}
              <Typography>{department.title}</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h5">{department.titlenumber}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

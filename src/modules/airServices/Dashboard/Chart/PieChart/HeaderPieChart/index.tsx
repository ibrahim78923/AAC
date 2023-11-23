import { Box, Grid, Typography, useTheme } from '@mui/material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { dropDownMenus, pieChartHeader } from './HeaderPieChart.data';
import { v4 as uuidv4 } from 'uuid';

export const HeaderPieChart = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        marginRight={3}
        marginTop={1}
      >
        <Typography variant="h5">Agent Availability</Typography>
        <SingleDropdownButton
          dropdownOptions={dropDownMenus}
          dropdownName="All Dept."
        />
      </Box>
      <Grid container justifyContent={'space-between'}>
        {pieChartHeader(theme)?.map((department) => (
          <Grid item sx={{ mt: 3 }} key={uuidv4()} xs={12} lg={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {department?.icon}
              <Typography variant="body3">{department?.title}</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h5">{department?.titleNumber}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

import { Box, Grid, useTheme } from '@mui/material';
import { PieChart } from '../../Chart/PieChart';
import { TopPerformer } from '../../TopPerformer';
import { Announcement } from '../../Announcement';

const DashboardCards = () => {
  const theme = useTheme();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <Box
            borderRadius={3}
            p={2}
            border={`1px solid ${theme?.palette?.grey?.[700]}`}
            height="100%"
          >
            <PieChart />
          </Box>
        </Grid>

        <Grid item xs={12} lg={4}>
          <TopPerformer />
        </Grid>

        <Grid item xs={12} lg={4}>
          <Box
            borderRadius={3}
            border={`1px solid ${theme?.palette?.grey?.[700]}`}
            height="100%"
          >
            <Announcement />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardCards;

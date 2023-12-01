import { Box, Grid } from '@mui/material';
import TotalChart from './TotalChart';
import OvertimeChart from './OvertimeChart';
import ImpressionChart from './ImpressionChart';
import ClickChart from './ClicksChart';
import ContactChart from './ContactsChart';
import CustomersChart from './CustomersChart';
import HighCostPerClickChart from './HighCostPerClickChart';
import LowCostPerClickChart from './LowCostPerClickChart';

const AnalyzeCharts = () => {
  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TotalChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <OvertimeChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <ImpressionChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <ClickChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContactChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomersChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <HighCostPerClickChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <LowCostPerClickChart />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyzeCharts;

import { Grid } from '@mui/material';
import CardsDetails from './CardsDetails';
import CustomizedAccordions from './CustomizedAccordions';
import PerformanceTable from './PerformanceTable';

const Performance = () => {
  return (
    <Grid container spacing={2}>
      <CardsDetails />
      <Grid item xs={12}>
        <PerformanceTable />
      </Grid>
      <Grid item md={12}>
        <CustomizedAccordions />
      </Grid>
    </Grid>
  );
};
export default Performance;

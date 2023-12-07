import { Grid } from '@mui/material';
import CardsDetails from './CardsDetails';
import CustomizedAccordions from './CustomizedAccordions';

const Performance = () => {
  return (
    <Grid container>
      <Grid item md={12}>
        <CardsDetails />
        <CustomizedAccordions />
      </Grid>
    </Grid>
  );
};
export default Performance;

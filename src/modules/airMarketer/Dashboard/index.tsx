import { Grid, Typography } from '@mui/material';
import Categories from './Categories';
import TotalMarketingEmail from './TotalMarketingEmail';
import FormsTable from './FormsTable';

const Dashboard = () => {
  return (
    <>
      <Typography variant="h3">Dashboard</Typography>
      <Categories />
      <Grid container>
        <Grid>
          <TotalMarketingEmail />
          <FormsTable />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;

import { Grid, Typography } from '@mui/material';
import Categories from './Categories';
import TotalMarketingEmail from './TotalMarketingEmail';
import FormsTable from './FormsTable';
import ContactCustomerGraph from './ContactCustomerGraph';

const Dashboard = () => {
  return (
    <>
      <Typography variant="h3">Dashboard</Typography>
      <Categories />
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <ContactCustomerGraph />
        </Grid>
        <Grid item sm={6}>
          <TotalMarketingEmail />
        </Grid>
        <Grid item sm={6}>
          <FormsTable />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;

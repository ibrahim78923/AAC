import { Grid, Typography } from '@mui/material';
import Actions from './Actions';
import Manage from './Manage';

const Dashboard = () => {
  return (
    <Grid>
      <Grid container>
        <Grid item xs={6} sm={6}>
          <Typography variant="h4">Sales Dashboard</Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Actions />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Manage />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Dashboard;

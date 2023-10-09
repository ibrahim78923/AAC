import { Grid, Typography } from '@mui/material';
import Actions from './Actions';

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
      </Grid>
    </Grid>
  );
};
export default Dashboard;

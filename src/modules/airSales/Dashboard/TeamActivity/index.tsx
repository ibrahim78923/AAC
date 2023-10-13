import { Grid } from '@mui/material';
import ActivityDetails from './ActivityDetails';

const TeamActivity = () => {
  return (
    <Grid container>
      <Grid item sm={12}>
        Team Activity
      </Grid>
      ;
      <Grid item sm={12}>
        <ActivityDetails />
      </Grid>
    </Grid>
  );
};
export default TeamActivity;

import { Grid, Typography } from '@mui/material';
import CreateForm from './CreateForm';

const CreateDashboard = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <Typography variant="h3">Create Dashboard</Typography>
        </Grid>
        <Grid item xs={12} lg={12}>
          <CreateForm />
        </Grid>
      </Grid>
    </>
  );
};
export default CreateDashboard;

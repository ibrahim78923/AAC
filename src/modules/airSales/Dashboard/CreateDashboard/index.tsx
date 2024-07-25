import { Grid, Typography } from '@mui/material';
import CreateForm from './CreateForm';

const CreateDashboard = () => {
  return (
    <>
      <Grid container spacing={4} mt={1}>
        <Grid item xs={12} lg={12} sx={{ paddingTop: '0px !important' }}>
          <Typography variant="h3" sx={{ textAlign: 'start' }}>
            {'Create Dashboard'}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={12}>
          <CreateForm />
        </Grid>
      </Grid>
    </>
  );
};
export default CreateDashboard;

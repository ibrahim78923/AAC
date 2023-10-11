import { Grid } from '@mui/material';
import CreateForm from './CreateForm';
import DetailsView from './DetailsView';

const CreateDashboard = () => {
  return (
    <Grid container spacing={4} mt={1}>
      <Grid item sm={4}>
        <CreateForm />
      </Grid>

      <Grid item sm={8}>
        <DetailsView />
      </Grid>
    </Grid>
  );
};
export default CreateDashboard;

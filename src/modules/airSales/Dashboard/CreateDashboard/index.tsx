import { Grid } from '@mui/material';
import CreateForm from './CreateForm';
import DetailsView from './DetailsView';

const CreateDashboard = () => {
  return (
    <Grid container>
      <Grid item sm={6}>
        <CreateForm />
      </Grid>
      \
      <Grid item sm={6}>
        <DetailsView />
      </Grid>
    </Grid>
  );
};
export default CreateDashboard;

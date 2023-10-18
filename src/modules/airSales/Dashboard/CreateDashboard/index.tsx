import { Grid, Typography } from '@mui/material';
import CreateForm from './CreateForm';

const CreateDashboard = ({
  setIsShowCreateDashboardForm,
  isShowEditDashboard,
}: any) => {
  return (
    <>
      <Typography variant="h4">
        {isShowEditDashboard ? 'Edit Dashboard' : 'Create Dashboard'}
      </Typography>
      <Grid container spacing={4} mt={2}>
        <Grid item xs={12} lg={12}>
          <CreateForm
            setIsShowCreateDashboardForm={setIsShowCreateDashboardForm}
            isShowEditDashboard={isShowEditDashboard}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default CreateDashboard;

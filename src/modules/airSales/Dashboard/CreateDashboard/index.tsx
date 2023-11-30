import { Grid, Typography } from '@mui/material';
import CreateForm from './CreateForm';

const CreateDashboard = ({
  setIsShowCreateDashboardForm,
  isShowEditDashboard,
}: any) => {
  return (
    <>
      <Grid container spacing={4} mt={1}>
        <Typography variant="h3" sx={{ textAlign: 'start' }}>
          {isShowEditDashboard ? 'Edit Dashboard' : 'Create Dashboard'}
        </Typography>
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
